/**
 * Explainable Rules-Based Matching Engine for Foundly
 * 
 * Compares lost reports against found reports using clear heuristic dimensions:
 * 1. Category Alignment (30 pts) - Strong prerequisite filter
 * 2. Title & Keyword Lexical Similarity (25 pts) - Token overlap & stem matching
 * 3. Color Harmony (15 pts) - Direct exact or compatible color match
 * 4. Location Proximity (15 pts) - Campus area overlap (e.g. both in Library or Science)
 * 5. Temporal Coherence (15 pts) - Found date/time is reasonably at or after Lost date/time
 * 
 * Returns transparent explainability breakdowns:
 * - matchedFactors: string[] with rationale
 * - unmatchedFactors: string[] detailing gaps
 * - confidenceLabel: 'High Confidence' | 'Promising Match' | 'Weak Possibility' | 'Inconclusive'
 * - disclaimer: Transparent notice that high score does not verify legal ownership.
 */

// Common campus building grouping to catch same-facility matches
const LOCATION_ZONES = {
  library: ['library', 'carrel', 'quiet study', 'book stacks'],
  science: ['science', 'chem', 'hall b', 'lab tech', 'biology'],
  engineering: ['engineering', 'eng', 'hall 1st', 'room 302'],
  dining: ['dining', 'student union', 'cafeteria', 'food court'],
  rec: ['gym', 'recreation', 'lockers', 'courts'],
  transit: ['bus stop', 'parking', 'bike racks', 'university ave']
};

export const calculateMatchScore = (lostReport, foundReport) => {
  // Guard rails: A report cannot match itself or reports of same type
  if (!lostReport || !foundReport) return null;
  if (lostReport.id === foundReport.id) return null;
  if (lostReport.type === foundReport.type) return null;

  let score = 0;
  const matchedFactors = [];
  const unmatchedFactors = [];

  // 1. Category Matching (Max 30 pts)
  if (lostReport.category && foundReport.category && lostReport.category === foundReport.category) {
    score += 30;
    matchedFactors.push({
      field: 'Category',
      detail: `Both items are classified under the same category (${lostReport.category}).`,
      points: 30
    });
  } else {
    unmatchedFactors.push({
      field: 'Category',
      detail: `Categories differ (${lostReport.category || 'N/A'} vs ${foundReport.category || 'N/A'}).`
    });
  }

  // 2. Title & Keyword Overlap (Max 25 pts)
  const tokenize = (text) => {
    if (!text) return [];
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2 && !['the', 'and', 'with', 'for', 'has', 'room', 'found', 'lost'].includes(w));
  };

  const lostTokens = tokenize(`${lostReport.title} ${lostReport.description}`);
  const foundTokens = tokenize(`${foundReport.title} ${foundReport.description}`);
  
  const commonTokens = lostTokens.filter((token) => foundTokens.includes(token));
  const uniqueCommonTokens = Array.from(new Set(commonTokens));

  if (uniqueCommonTokens.length >= 3) {
    score += 25;
    matchedFactors.push({
      field: 'Keyword & Content Overlap',
      detail: `Strong descriptive token matches: "${uniqueCommonTokens.slice(0, 4).join('", "')}".`,
      points: 25
    });
  } else if (uniqueCommonTokens.length >= 1) {
    score += 15;
    matchedFactors.push({
      field: 'Keyword Overlap',
      detail: `Shared keywords found: "${uniqueCommonTokens.join('", "')}".`,
      points: 15
    });
  } else {
    unmatchedFactors.push({
      field: 'Keyword Overlap',
      detail: 'No distinctive keywords shared between titles or descriptions.'
    });
  }

  // 3. Color Harmony (Max 15 pts)
  if (lostReport.color && foundReport.color) {
    const lColor = lostReport.color.trim().toLowerCase();
    const fColor = foundReport.color.trim().toLowerCase();
    if (lColor === fColor) {
      score += 15;
      matchedFactors.push({
        field: 'Color',
        detail: `Matching color tag (${lostReport.color}).`,
        points: 15
      });
    } else if (lColor.includes(fColor) || fColor.includes(lColor)) {
      score += 10;
      matchedFactors.push({
        field: 'Color',
        detail: `Related color tone (${lostReport.color} vs ${foundReport.color}).`,
        points: 10
      });
    } else {
      unmatchedFactors.push({
        field: 'Color',
        detail: `Color tags do not match (${lostReport.color} vs ${foundReport.color}).`
      });
    }
  }

  // 4. Location Proximity (Max 15 pts)
  const lLoc = (lostReport.location || '').toLowerCase();
  const fLoc = (foundReport.location || '').toLowerCase();

  let zoneMatched = false;
  for (const [zone, keywords] of Object.entries(LOCATION_ZONES)) {
    const lostInZone = keywords.some((k) => lLoc.includes(k));
    const foundInZone = keywords.some((k) => fLoc.includes(k));
    if (lostInZone && foundInZone) {
      zoneMatched = true;
      score += 15;
      matchedFactors.push({
        field: 'Location Proximity',
        detail: `Both items were reported within the same campus zone (${zone.toUpperCase()} area).`,
        points: 15
      });
      break;
    }
  }

  if (!zoneMatched) {
    if (lLoc && fLoc && (lLoc.includes(fLoc) || fLoc.includes(lLoc))) {
      score += 12;
      matchedFactors.push({
        field: 'Location',
        detail: 'Direct or nested building location match.',
        points: 12
      });
    } else {
      unmatchedFactors.push({
        field: 'Location',
        detail: 'Reported in distinct campus buildings or outdoor zones.'
      });
    }
  }

  // 5. Temporal Coherence (Max 15 pts)
  // Believable if found timestamp is close to or after lost timestamp
  if (lostReport.dateTime && foundReport.dateTime) {
    const lostTime = new Date(lostReport.dateTime).getTime();
    const foundTime = new Date(foundReport.dateTime).getTime();
    const diffHours = (foundTime - lostTime) / (1000 * 60 * 60);

    if (diffHours >= -2 && diffHours <= 72) {
      // Ideal window: found within 3 days after being lost
      score += 15;
      matchedFactors.push({
        field: 'Timeline Alignment',
        detail: `Found within realistic time window (${Math.abs(Math.round(diffHours))}h interval).`,
        points: 15
      });
    } else if (diffHours > 72 && diffHours <= 240) {
      score += 8;
      matchedFactors.push({
        field: 'Timeline Plausibility',
        detail: 'Found within 10 days of the reported loss date.',
        points: 8
      });
    } else if (diffHours < -2) {
      unmatchedFactors.push({
        field: 'Timeline Inconsistency',
        detail: 'Item was logged as found significantly before the reported lost time.'
      });
    }
  }

  // Determine Confidence Tier
  let confidenceLabel = 'Weak Possibility';
  let badgeColor = 'text-midnight-500 bg-midnight-100 border-midnight-200';
  if (score >= 75) {
    confidenceLabel = 'High Confidence Match';
    badgeColor = 'text-midnight-950 bg-lime border-lime-border';
  } else if (score >= 50) {
    confidenceLabel = 'Promising Match';
    badgeColor = 'text-blue-700 bg-blue-50 border-blue-200';
  } else if (score >= 30) {
    confidenceLabel = 'Moderate Possibility';
    badgeColor = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    confidenceLabel,
    badgeColor,
    matchedFactors,
    unmatchedFactors,
    candidateItem: foundReport,
    targetItem: lostReport,
    disclaimer: 'This relevance score is calculated based on observable metadata. It does not establish ownership or guarantee an exact match.'
  };
};

/**
 * Find all ranked match suggestions for a given report against a pool of reports.
 */
export const findMatchesForReport = (targetReport, allReports, minScore = 30) => {
  if (!targetReport || !allReports) return [];

  // If target is 'lost', we compare against all 'found' items, and vice versa
  const candidatePool = allReports.filter(
    (item) => item.id !== targetReport.id && item.type !== targetReport.type
  );

  const matches = candidatePool
    .map((candidate) => {
      const lostObj = targetReport.type === 'lost' ? targetReport : candidate;
      const foundObj = targetReport.type === 'found' ? targetReport : candidate;
      return calculateMatchScore(lostObj, foundObj);
    })
    .filter((match) => match && match.score >= minScore)
    .sort((a, b) => b.score - a.score);

  return matches;
};

/**
 * Aggregate total potential match suggestions across the entire database for the dashboard.
 */
export const getGlobalMatchCount = (reports) => {
  const lostReports = reports.filter((r) => r.type === 'lost');
  let matchedPairs = 0;

  lostReports.forEach((lost) => {
    const matches = findMatchesForReport(lost, reports, 50);
    if (matches.length > 0) {
      matchedPairs++;
    }
  });

  return matchedPairs;
};
