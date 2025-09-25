export const TrainIcon = () => {
  return (
    <svg
      data-slot="icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="TrainIcon"
    >
      <defs>
        <clipPath id="circleMask">
          <circle cx="12" cy="12" r="7"></circle>
        </clipPath>
        <linearGradient id="fadeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.6"></stop>
          <stop offset="75%" stopColor="white" stopOpacity="0.15"></stop>
          <stop offset="100%" stopColor="white" stopOpacity="0"></stop>
        </linearGradient>
      </defs>
      <image
        href="/train-icon-photo.webp"
        x="5"
        y="5"
        width="14"
        height="14"
        clipPath="url(#circleMask)"
      ></image>
      <circle cx="12" cy="12" r="6" fill="url(#fadeGradient)"></circle>
      <path
        d="M16.625 20.1226C14.6815 21.2446 12.3964 21.6219 10.1954 21.1841C7.99441 20.7463 6.02762 19.5232 4.66148 17.7429C3.29534 15.9625 2.62303 13.7462 2.7698 11.5068C2.91658 9.26752 3.87243 7.15792 5.45926 5.57108"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M20.0107 7.48682C21.0289 9.25025 21.4366 11.3004 21.1709 13.3192C20.9051 15.338 19.9806 17.2127 18.5407 18.6526"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M12 2.86182C13.2147 2.86182 14.4176 3.10107 15.5398 3.56593C16.6621 4.03079 17.6818 4.71214 18.5407 5.57108"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
      <path
        d="M7.375 4.10108C8.07507 3.6969 8.8251 3.38622 9.60592 3.177"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      ></path>
    </svg>
  )
}