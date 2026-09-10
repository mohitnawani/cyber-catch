type ChecklistItem = {
  text: string
}

type EmptyStateCardProps = {
  heading: string
  body: string
  subHeading?: string
  checklist: ChecklistItem[]
  primaryCTA: string
  primaryOnClick: () => void
  secondaryCTA: string
  secondaryOnClick: () => void
}

export default function EmptyStateCard({
  heading,
  body,
  subHeading,
  checklist,
  primaryCTA,
  primaryOnClick,
  secondaryCTA,
  secondaryOnClick,
}: EmptyStateCardProps) {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-navy mb-2">{heading}</h3>
      <p className="text-gray-600 text-sm mb-4">{body}</p>

      {subHeading && (
        <p className="text-gray-500 text-sm italic mb-6">{subHeading}</p>
      )}

      {checklist.length > 0 && (
        <div className="space-y-3">
          {checklist.map((item, index) => (
            <div key={index} className="flex items-start">
              <span className="flex-shrink-0">
                <svg
                  className="h-4 w-4 text-indigo-600"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6.2-5.8l-2-2l4 4" />
                </svg>
              </span>
              <span className="ml-2 flex-1 text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <button onClick={primaryOnClick} className="flex-1 px-4 py-2 rounded bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
          {primaryCTA}
        </button>
        <a onClick={secondaryOnClick} className="text-indigo-600 hover:underline text-sm">
          {secondaryCTA}
        </a>
      </div>
    </div>
  )
}