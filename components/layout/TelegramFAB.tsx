export function TelegramFAB() {
  return (
    <a
      href="https://t.me/tacousti"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full font-medium text-sm shadow-lg hover:opacity-90 transition-opacity"
      style={{ backgroundColor: 'var(--accent)', color: 'var(--bg)' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.46 13.28l-2.974-.924c-.647-.204-.66-.647.136-.958l11.57-4.461c.537-.194 1.006.131.702.284z"/>
      </svg>
      Консультация
    </a>
  )
}
