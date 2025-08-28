import type { Speaker } from '../lib/types';

interface HeaderChipsProps {
  speakers: Speaker[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export default function HeaderChips({ speakers, selected, onSelect }: HeaderChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto py-4">
      {speakers.map((speaker) => (
        <button
          key={speaker.id}
          onClick={() => onSelect(speaker.id === selected ? null : speaker.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
            ${
              speaker.id === selected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {speaker.name}
        </button>
      ))}
    </div>
  );
}
