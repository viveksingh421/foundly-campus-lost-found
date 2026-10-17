import React, { useState } from 'react';
import { 
  PlusCircle, 
  Upload, 
  MapPin, 
  Calendar, 
  Tag, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES, LOCATIONS } from '../data/sampleData';

export const ReportItemPage = ({ onSubmitReport, onCancel }) => {
  const [reportType, setReportType] = useState('lost'); // 'lost' | 'found'
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('bottles');
  const [color, setColor] = useState('Black');
  const [location, setLocation] = useState(LOCATIONS[1] || 'Main Library');
  const [customLocation, setCustomLocation] = useState('');
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  });
  const [description, setDescription] = useState('');
  const [privateDetails, setPrivateDetails] = useState('');
  const [contactName, setContactName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [successId, setSuccessId] = useState(null);

  // Quick preset image selector for demo convenience
  const DEMO_PRESET_IMAGES = [
    { label: 'Water Bottle', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80' },
    { label: 'Spiral Notebook', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },
    { label: 'Calculator', url: 'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80' },
    { label: 'ID Lanyard', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80' },
    { label: 'Umbrella', url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80' },
    { label: 'Backpack', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80' },
  ];

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (PNG, JPG, WebP).');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (url) => {
    setImageUrl(url);
    setImagePreview(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!title.trim() || title.trim().length < 4) {
      setError('Please provide a descriptive item title (at least 4 characters).');
      return;
    }
    if (!color.trim()) {
      setError('Please specify the primary color of the item.');
      return;
    }
    if (!description.trim() || description.trim().length < 10) {
      setError('Please provide a public description with recognizable details (at least 10 characters).');
      return;
    }

    const effectiveLocation = location === 'Other / Campus Grounds' && customLocation.trim()
      ? customLocation.trim()
      : location;

    const newReport = {
      id: 'rep-' + Date.now().toString(36),
      type: reportType,
      title: title.trim(),
      category,
      color: color.trim(),
      location: effectiveLocation,
      dateTime,
      description: description.trim(),
      privateDetails: privateDetails.trim() || 'No confidential distinguishing marks specified.',
      contactName: contactName.trim() || (reportType === 'lost' ? 'Student Reporter' : 'Campus Custodian'),
      status: 'Open',
      imageUrl: imageUrl.trim() || 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80',
      createdAt: new Date().toISOString(),
      isSample: false
    };

    onSubmitReport(newReport);
    setSuccessId(newReport.id);
  };

  if (successId) {
    return (
      <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white border border-warm-300 shadow-elevated text-center space-y-4 animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-midnight-950">
            Report Created & Broadcast!
          </h2>
          <p className="text-xs text-midnight-600">
            Report ID <strong className="font-mono text-midnight-950 font-bold">{successId}</strong> is now live in the campus registry and active inside the explainable matching engine.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-warm-100 border border-warm-200 text-xs text-left text-midnight-700 space-y-1">
          <div className="font-mono font-bold text-midnight-900 uppercase">Immediate Next Steps</div>
          <p>
            • Check the <strong>Dashboard</strong> or <strong>Explore</strong> tab to see calculated match scores.<br />
            • If someone claims this item, verify their confidential distinguishing details.
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setSuccessId(null);
              setTitle('');
              setDescription('');
              setPrivateDetails('');
              setImagePreview('');
              setImageUrl('');
            }}
            className="px-4 py-2.5 rounded-xl border border-warm-300 text-midnight-800 text-xs font-bold hover:bg-warm-100"
          >
            File Another Report
          </button>
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-midnight-950 text-lime text-xs font-bold hover:bg-midnight-900 shadow-subtle"
          >
            Go to Campus Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-midnight-950 tracking-tight">
          Report an Item
        </h1>
        <p className="text-xs sm:text-sm text-midnight-500 mt-1">
          Register a lost possession or log a found article to initiate campus-wide explainable matching.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-warm-300 shadow-card p-6 sm:p-8 space-y-6">
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Report Type Toggle (Lost vs Found) */}
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-midnight-500 font-bold block mb-2">
            What are you reporting? *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setReportType('lost')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                reportType === 'lost'
                  ? 'border-lost-badge bg-lost-bg text-midnight-950 shadow-subtle ring-2 ring-amber-500/20'
                  : 'border-warm-300 bg-warm-50 text-midnight-600 hover:bg-warm-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm sm:text-base">I Lost An Item</span>
                <span className={`w-3 h-3 rounded-full ${reportType === 'lost' ? 'bg-amber-500 ring-4 ring-amber-200' : 'bg-warm-300'}`} />
              </div>
              <p className="text-[11px] text-midnight-500 mt-1">
                You misplaced personal property on campus and want to find it.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setReportType('found')}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                reportType === 'found'
                  ? 'border-midnight-950 bg-midnight-950 text-white shadow-subtle ring-2 ring-lime/30'
                  : 'border-warm-300 bg-warm-50 text-midnight-600 hover:bg-warm-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm sm:text-base text-white">I Found An Item</span>
                <span className={`w-3 h-3 rounded-full ${reportType === 'found' ? 'bg-lime ring-4 ring-lime/30' : 'bg-warm-300'}`} />
              </div>
              <p className="text-[11px] text-midnight-400 mt-1">
                You discovered an unattended item and want to return it to its owner.
              </p>
            </button>
          </div>
        </div>

        {/* Step 2: Item Name & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-midnight-700 font-bold block mb-1">
              Item Title / Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Black Hydro Flask Water Bottle 32oz"
              className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-midnight-700 font-bold block mb-1">
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 text-sm font-medium bg-white"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 3: Color, Location & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-midnight-700 font-bold block mb-1">
              Primary Color *
            </label>
            <input
              type="text"
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g. Matte Black, Navy Blue, Silver"
              className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-midnight-700 font-bold block mb-1">
              Approximate Date & Time *
            </label>
            <input
              type="datetime-local"
              required
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-midnight-700 font-bold block mb-1">
              Reporter Name or Desk
            </label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="e.g. Alex R. (Student)"
              className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 text-sm font-medium"
            />
          </div>
        </div>

        {/* Location Dropdown */}
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-midnight-700 font-bold block mb-1">
            Campus Location *
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 text-sm font-medium bg-white"
          >
            {LOCATIONS.filter((loc) => loc !== 'All Locations').map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {location === 'Other / Campus Grounds' && (
            <input
              type="text"
              value={customLocation}
              onChange={(e) => setCustomLocation(e.target.value)}
              placeholder="Describe exact building, room number, or outdoor landmark..."
              className="w-full mt-2 px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 text-sm font-medium"
            />
          )}
        </div>

        {/* Public Description */}
        <div>
          <label className="text-xs font-mono uppercase tracking-wider text-midnight-700 font-bold block mb-1">
            Public Observable Description *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe visible aspects (e.g. brand, size, exterior condition, where it was left or found)..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 text-sm font-medium leading-relaxed"
          />
        </div>

        {/* Confidential Distinguishing Proof (Secret details for ownership verification) */}
        <div className="p-4 rounded-2xl bg-midnight-950 text-white border border-midnight-850 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-lime font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Confidential Ownership Verification Details
            </label>
            <span className="text-[10px] text-midnight-400 font-mono">
              Kept hidden from public
            </span>
          </div>

          <textarea
            rows={2}
            value={privateDetails}
            onChange={(e) => setPrivateDetails(e.target.value)}
            placeholder="e.g. Specific sticker name on the bottom, personal engraving, scratch on the back, or items inside the pocket that only the true owner would know."
            className="w-full px-3.5 py-2 rounded-xl bg-midnight-900 border border-midnight-750 focus:outline-none focus:border-lime text-xs text-white placeholder-midnight-500 leading-relaxed font-sans"
          />
          <p className="text-[11px] text-midnight-400">
            This information is strictly reserved to verify identity during pickup claims.
          </p>
        </div>

        {/* Step 4: Photo Upload & Preset Picker */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-midnight-700 font-bold block">
            Item Photo (Optional)
          </label>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* File Upload Button */}
            <label className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-dashed border-warm-400 hover:border-midnight-800 bg-warm-50 text-xs font-bold text-midnight-800 cursor-pointer flex items-center justify-center gap-2 transition-colors">
              <Upload className="w-4 h-4 text-midnight-500" />
              <span>Choose Photo File</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageFileChange}
                className="hidden"
              />
            </label>

            <span className="text-xs text-midnight-400 font-mono">
              or select demo stock image:
            </span>

            {/* Quick Demo Presets */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {DEMO_PRESET_IMAGES.map((p, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => handlePresetSelect(p.url)}
                  className={`text-[11px] font-mono px-2 py-1 rounded-lg border transition-all ${
                    imageUrl === p.url
                      ? 'bg-midnight-950 text-lime border-midnight-950 font-bold'
                      : 'bg-warm-100 text-midnight-600 border-warm-300 hover:bg-warm-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Preview Box */}
          {imagePreview && (
            <div className="relative w-36 h-28 rounded-xl bg-warm-200 border border-warm-300 overflow-hidden shadow-inner group">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={() => {
                  setError('Invalid image source. Please choose another image.');
                  setImagePreview('');
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview('');
                  setImageUrl('');
                }}
                className="absolute top-1 right-1 p-1 rounded-md bg-midnight-950/80 text-white hover:bg-rose-600 transition-colors"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Actions */}
        <div className="pt-4 border-t border-warm-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-midnight-600 hover:text-midnight-950"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-midnight-950 hover:bg-midnight-900 text-lime font-bold text-xs flex items-center gap-2 shadow-subtle hover:shadow-card active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Publish Report to Campus Registry</span>
          </button>
        </div>
      </form>
    </div>
  );
};
