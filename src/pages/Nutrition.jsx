import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Brain, Utensils, Leaf, Clock, Activity, HeartHandshake,
  Sun, Droplets, ArrowRight, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Pattern24, Pattern25, Pattern27 } from '../AnimatedPatterns';

// Animation variants for staggered word reveal
const wordRevealContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const wordVariant = {
  hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
  }
};

// Official Brand Text Overline (Consistent across Spaces, Wellness, Programmes)
const SectionOverline = ({ text, light = false }) => (
  <span
    style={{
      color: light ? 'rgba(255, 255, 255, 0.9)' : 'var(--wine)',
      textTransform: 'uppercase',
      letterSpacing: '0.26em',
      fontSize: 'var(--fs-small)',
      fontWeight: 800,
      display: 'block',
      marginBottom: '0.45rem'
    }}
  >
    ✦ {text}
  </span>
);

// Corner Mandala Flourish SVG for Hero, Quotes & Cards
const CornerFlourish = ({ style, inverted = false }) => (
  <div style={{ ...style, pointerEvents: 'none', userSelect: 'none' }} aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 278 556" width="100%" height="100%" style={{ display: 'block', transform: inverted ? 'scaleX(-1)' : 'none' }}>
      <path 
        d="M-277.825 279.749C-254.658 320.639 -225.62 359.005 -170.541 362.951C-134.906 365.504 -103.705 345.742 -76.1868 328.309C-72.8255 326.175 -69.4781 324.056 -66.1586 321.992C-47.0785 310.151 -28.8771 299.789 -16.0175 292.691C-8.44407 291.059 -2.66983 292.007 3.10441 295.982C10.2595 308.994 21.3756 328.686 34.2212 349.382C45.0025 369.13 47.3457 379.436 48.2802 393.745C51.4462 441.984 21.6685 462.695 8.76707 469.361C5.67074 464.87 3.13229 456.265 -8.80672 456.265C-20.1181 457.242 -27.7892 469.361 -21.9313 480.88C-19.2812 486.096 -13.7999 489.318 -7.95592 489.332C-0.229032 489.346 3.62046 485.72 10.2594 481.104C22.6308 475.344 63.3853 451.761 59.5358 393.005C59.4939 392.364 59.4381 391.736 59.3963 391.109C68.6295 408.82 75.0453 427.285 73.6227 447.186C70.1498 495.719 36.0343 522.468 -1.02405 543.806C-13.2141 536.4 -30.0208 525.02 -41.1369 514.867C-50.6909 506.151 -65.7542 484.227 -73.5229 459.194C-10.8989 427.16 -39.9792 360.622 -40.2861 359.939C-40.314 359.869 -40.3698 359.828 -40.3977 359.758C-40.4814 359.576 -40.5511 359.409 -40.6627 359.228C-40.7882 359.033 -40.9276 358.879 -41.0671 358.712C-41.1369 358.628 -41.1927 358.544 -41.2624 358.461C-41.5832 358.098 -41.9458 357.791 -42.3503 357.54C-42.4201 357.485 -42.5037 357.457 -42.5874 357.415C-42.9361 357.206 -43.2987 357.052 -43.6753 356.927C-43.7869 356.885 -43.8845 356.857 -43.9961 356.815C-44.4424 356.69 -44.9166 356.62 -45.3769 356.62C-45.4048 356.62 -45.4187 356.62 -45.4466 356.62C-45.5722 356.62 -45.6977 356.648 -45.8232 356.662C-46.0464 356.676 -46.2696 356.69 -46.5067 356.731C-46.6601 356.759 -46.7995 356.815 -46.9529 356.857C-47.1761 356.913 -47.3993 356.982 -47.6085 357.08C-47.6643 357.108 -47.7201 357.108 -47.7619 357.136C-47.8874 357.192 -47.999 357.275 -48.1245 357.345C-48.2361 357.401 -48.3616 357.443 -48.4732 357.512C-72.8812 373.007 -86.5916 393.898 -89.3114 419.559C-93.398 414.204 -98.2238 409.587 -103.817 405.794C-118.894 395.572 -136.328 393.215 -149.188 393.215C-159.704 393.215 -167.18 394.791 -167.835 394.93C-169.384 395.265 -170.723 396.241 -171.518 397.622C-172.313 399.002 -172.494 400.634 -172.02 402.154C-153.553 460.631 -100.79 462.96 -84.4019 462.22C-75.9916 489.639 -59.5615 513.333 -48.7522 523.221C-36.1158 534.754 -16.7289 547.669 -3.96696 555.214C-2.22353 556.246 -0.0616666 556.259 1.69571 555.269C42.5896 532.105 80.959 503.069 84.9062 447.995C87.4585 412.349 67.695 381.165 50.2607 353.649C48.1268 350.288 46.0067 346.941 43.9425 343.622C32.1151 324.558 21.7661 306.386 14.6529 293.527C13.0071 285.927 13.9416 280.139 17.9445 274.351C30.9575 267.197 50.6234 256.096 71.3074 243.265C91.071 232.485 101.364 230.142 115.688 229.208C160.641 226.265 181.715 251.954 189.777 265.9C185.858 269.526 175.481 271.297 175.481 284.421C176.457 295.731 188.578 303.401 200.098 297.544C205.314 294.894 208.536 289.413 208.55 283.57C208.55 278.633 207.072 275.286 204.812 271.785C204.757 271.437 204.687 271.088 204.561 270.739C204.366 270.181 185.342 217.702 122.648 217.702C120.151 217.702 117.585 217.786 114.949 217.953C114.307 217.995 113.694 218.051 113.066 218.092C130.779 208.86 149.26 202.445 169.135 203.867C217.658 207.326 244.423 241.452 265.763 278.507C258.357 290.696 246.975 307.501 236.822 318.617C228.105 328.17 206.179 343.232 181.13 350.986C164.588 318.658 138.841 310.723 117.711 310.723C97.9331 310.723 82.2143 317.598 81.8796 317.752C81.7541 317.808 81.6564 317.891 81.5448 317.947C81.4193 318.017 81.2938 318.059 81.1822 318.128C81.1404 318.156 81.0985 318.198 81.0567 318.226C80.8893 318.338 80.7359 318.477 80.5824 318.603C80.443 318.714 80.3174 318.826 80.1919 318.951C80.0524 319.091 79.9409 319.23 79.8293 319.384C79.7177 319.523 79.6061 319.663 79.5085 319.816C79.4109 319.969 79.3272 320.123 79.2435 320.29C79.1598 320.457 79.0761 320.611 79.0064 320.778C78.9367 320.946 78.8948 321.127 78.839 321.294C78.7832 321.462 78.7275 321.629 78.6996 321.81C78.6577 321.992 78.6438 322.173 78.6298 322.354C78.6159 322.535 78.588 322.703 78.588 322.884C78.588 323.065 78.6019 323.247 78.6298 323.414C78.6438 323.609 78.6577 323.791 78.6996 323.986C78.7275 324.153 78.7832 324.321 78.839 324.474C78.8948 324.669 78.9506 324.864 79.0343 325.06C79.0622 325.115 79.0622 325.157 79.0901 325.213C79.1459 325.339 79.2296 325.436 79.2853 325.562C79.3551 325.687 79.3969 325.799 79.4667 325.924C94.9623 350.33 115.856 364.039 141.533 366.759C136.177 370.845 131.56 375.67 127.767 381.263C109.203 408.653 116.581 443.797 116.916 445.29C117.25 446.838 118.227 448.177 119.607 448.972C120.988 449.766 122.634 449.948 124.14 449.474C182.622 431.009 184.965 378.25 184.212 361.878C211.633 353.468 235.329 337.039 245.218 326.231C256.753 313.61 269.654 294.225 277.214 281.45C278.246 279.707 278.26 277.545 277.269 275.788C254.103 234.898 225.064 196.518 169.986 192.585C167.88 192.432 165.787 192.362 163.723 192.362C130.682 192.362 101.532 210.827 75.6451 227.227C72.2837 229.361 68.9364 231.481 65.6029 233.545C46.5507 245.371 28.3772 255.705 15.5176 262.818C7.8884 264.464 2.1002 263.473 -3.70194 259.457C-10.857 246.431 -21.9592 226.795 -34.7768 206.141C-45.5443 186.407 -47.8874 176.101 -48.8219 161.792C-52.0019 113.273 -21.8475 92.5908 -9.08561 86.05C-6.08691 90.6244 -3.39507 98.7829 8.265 98.7829C19.5764 97.8067 27.2475 85.6874 21.3895 74.1679C18.7395 68.952 13.2582 65.7304 7.4142 65.7165C-1.289 65.7025 -5.06875 70.3048 -13.507 75.7578C-28.2076 83.3584 -63.6899 107.513 -60.0915 162.531C-60.0496 163.172 -59.9938 163.786 -59.9519 164.414C-69.1712 146.716 -75.587 128.237 -74.1644 108.336C-70.7054 59.8173 -36.576 33.0685 0.482318 11.7169C12.6724 19.1223 29.4791 30.5024 40.5952 40.6413C50.1492 49.3576 65.2124 71.281 72.9811 96.3144C10.3711 128.335 39.4375 194.886 39.7444 195.569C39.8001 195.709 39.8838 195.82 39.9536 195.946C40.0094 196.057 40.0512 196.169 40.1209 196.281C40.1488 196.323 40.1907 196.35 40.2186 196.392C40.3441 196.587 40.4836 196.755 40.637 196.922C40.7346 197.034 40.8323 197.145 40.9299 197.257C41.0973 197.424 41.2646 197.564 41.4459 197.689C41.5575 197.773 41.6552 197.871 41.7807 197.94C41.976 198.066 42.1852 198.177 42.3944 198.275C42.506 198.331 42.6175 198.4 42.7291 198.442C42.9523 198.54 43.1894 198.61 43.4265 198.665C43.5381 198.693 43.6497 198.735 43.7612 198.749C43.9983 198.805 44.2494 198.819 44.4865 198.847C44.612 198.847 44.7236 198.875 44.8352 198.875C45.0583 198.875 45.2815 198.861 45.5186 198.833C45.672 198.819 45.8115 198.805 45.9649 198.777C46.1602 198.735 46.3415 198.679 46.5228 198.624C46.7041 198.568 46.8854 198.512 47.0668 198.442C47.1225 198.414 47.1783 198.414 47.2202 198.387C47.3318 198.331 47.4434 198.261 47.5549 198.191C47.6805 198.122 47.806 198.08 47.9315 197.996C72.3395 182.502 86.0499 161.61 88.7696 135.936C92.8562 141.291 97.682 145.907 103.275 149.7C130.668 168.263 165.829 160.871 167.308 160.551C168.856 160.216 170.195 159.24 170.99 157.859C171.785 156.478 171.966 154.847 171.492 153.326C154.392 99.1873 107.892 93.1765 88.0862 93.1765C86.4962 93.1765 85.1014 93.2184 83.8741 93.2742C75.4638 65.856 59.0337 42.1475 48.2105 32.2736C35.5741 20.7401 16.2011 7.82592 3.42523 0.281031C2.53259 -0.248924 1.54234 -0.499993 0.552073 -0.499993C-0.438195 -0.499994 -1.37266 -0.262871 -2.23741 0.239191C-43.1313 23.4038 -81.5147 52.4397 -85.4479 107.513C-88.0003 143.16 -68.2368 174.357 -50.8025 201.859C-48.6685 205.22 -46.5485 208.567 -44.4842 211.886C-32.6568 230.951 -22.3078 249.137 -15.1946 261.981C-13.5628 269.582 -14.4973 275.355 -18.5002 281.157C-31.5271 288.311 -51.193 299.427 -71.891 312.271C-91.6406 323.037 -101.934 325.38 -116.244 326.315C-164.725 329.481 -185.437 299.343 -191.978 286.568C-187.404 283.57 -179.244 280.878 -179.244 269.233C-180.221 257.923 -192.341 250.252 -203.862 256.11C-209.078 258.76 -212.3 264.24 -212.314 270.084C-212.328 278.772 -207.753 282.552 -202.314 290.933C-194.768 305.591 -170.639 341.168 -115.505 337.569C-114.863 337.528 -114.221 337.472 -113.594 337.43C-131.293 346.662 -149.76 353.078 -169.69 351.655C-218.228 348.182 -244.979 314.07 -266.318 277.015C-258.912 264.826 -247.531 248.021 -237.391 236.906C-228.66 227.353 -206.749 212.291 -181.713 204.523C-149.69 267.141 -83.1327 238.063 -82.4492 237.757C-82.3237 237.701 -82.2261 237.617 -82.1145 237.561C-81.989 237.492 -81.8634 237.45 -81.7518 237.38C-81.6961 237.352 -81.6682 237.31 -81.6124 237.268C-81.445 237.157 -81.2916 237.031 -81.1382 236.892C-80.9987 236.78 -80.8592 236.669 -80.7337 236.543C-80.6082 236.404 -80.4966 236.264 -80.3711 236.125C-80.2595 235.985 -80.1339 235.832 -80.0363 235.679C-79.9387 235.539 -79.869 235.386 -79.7853 235.232C-79.7016 235.065 -79.6039 234.898 -79.5342 234.73C-79.4645 234.563 -79.4226 234.396 -79.3668 234.228C-79.311 234.047 -79.2553 233.88 -79.2274 233.698C-79.1855 233.517 -79.1716 233.336 -79.1576 233.154C-79.1437 232.973 -79.1158 232.792 -79.1158 232.61C-79.1158 232.429 -79.1297 232.248 -79.1576 232.067C-79.1716 231.885 -79.1855 231.69 -79.2274 231.509C-79.2553 231.341 -79.311 231.174 -79.3668 231.007C-79.4226 230.811 -79.4784 230.616 -79.5621 230.435C-79.59 230.379 -79.59 230.323 -79.6179 230.268C-79.6737 230.142 -79.7573 230.044 -79.8131 229.933C-79.8829 229.807 -79.9247 229.682 -79.9945 229.57C-95.4901 205.164 -116.383 191.455 -142.061 188.736C-136.705 184.65 -132.088 179.824 -128.294 174.232C-109.73 146.827 -117.109 111.697 -117.429 110.205C-117.764 108.657 -118.74 107.318 -120.121 106.523C-120.986 106.021 -121.962 105.756 -122.953 105.756C-123.524 105.756 -124.096 105.84 -124.654 106.021C-183.164 124.486 -185.479 177.272 -184.726 193.645C-212.146 202.068 -235.843 218.469 -245.718 229.277C-257.253 241.899 -270.154 261.284 -277.713 274.058C-278.746 275.802 -278.759 277.963 -277.769 279.721L-277.825 279.749ZM-78.2092 422.139C-76.41 401.554 -66.326 384.415 -48.2361 371.082C-46.2138 377.637 -43.7311 388.487 -44.5819 400.481C-46.0464 421.205 -56.7162 437.117 -76.2705 447.898C-76.4379 447.228 -76.6192 446.587 -76.8005 445.917C-78.2789 438.024 -78.9066 429.991 -78.2231 422.125L-78.2092 422.139ZM-159.007 405.069C-148.476 403.995 -127.053 403.66 -110.079 415.194C-99.1862 422.599 -91.7243 433.882 -87.7493 448.748C-87.5958 449.543 -87.4564 450.338 -87.289 451.119C-102.561 451.579 -141.977 448.33 -159.007 405.055L-159.007 405.069ZM144.099 355.686C123.513 353.886 106.371 343.789 93.0375 325.715C99.5928 323.693 110.43 321.211 122.439 322.061C143.165 323.526 159.079 334.194 169.86 353.747C169.218 353.9 168.591 354.082 167.963 354.249C160.041 355.741 151.993 356.369 144.099 355.686ZM127.027 436.462C125.953 425.946 125.605 404.511 137.153 387.525C144.559 376.647 155.843 369.185 170.697 365.211C171.506 365.057 172.301 364.918 173.11 364.737C173.626 380.008 170.474 419.378 127.027 436.462ZM77.6535 133.383C75.8543 153.968 65.7563 171.108 47.6805 184.44C45.6581 177.886 43.1894 167.036 44.0262 155.042C45.4907 134.318 56.1605 118.405 75.7148 107.625C75.8822 108.294 76.0635 108.95 76.2448 109.605C77.7232 117.499 78.3509 125.518 77.6535 133.383ZM158.437 150.453C147.921 151.513 126.483 151.876 109.496 140.329C98.6026 132.923 91.1546 121.641 87.1796 106.774C87.0262 105.979 86.8867 105.184 86.7194 104.403C102.006 103.943 141.407 107.192 158.437 150.453ZM-144.683 199.837C-124.096 201.636 -106.955 211.733 -93.6211 229.807C-100.162 231.829 -111.014 234.312 -123.036 233.461C-143.762 231.997 -159.676 221.328 -170.458 201.775C-169.788 201.608 -169.16 201.427 -168.505 201.259C-160.597 199.781 -152.563 199.154 -144.683 199.837ZM-127.611 119.061C-126.537 129.576 -126.188 150.997 -137.737 167.984C-145.115 178.834 -156.357 186.281 -171.155 190.27C-171.992 190.437 -172.843 190.549 -173.679 190.73C-174.14 175.403 -170.848 136.075 -127.625 119.061L-127.611 119.061Z" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeOpacity="0.25" 
        vectorEffect="non-scaling-stroke" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  </div>
);

// The 6-Phase Nourishment Steps Data (Exact Verbatim Copy)
const journeySteps = [
  {
    phase: 1,
    title: 'Intention',
    subtitle: 'Eating with awareness',
    desc: 'The journey begins before the first bite, cultivating gratitude and presence.',
    icon: Brain
  },
  {
    phase: 2,
    title: 'Preparation',
    subtitle: 'Mindful cooking',
    desc: 'Food prepared with love and positive vibration retains its healing prana.',
    icon: Utensils
  },
  {
    phase: 3,
    title: 'Nourishment',
    subtitle: 'Satwik meals',
    desc: 'Pure, light, and energy-rich ingredients that clarify the mind and body.',
    icon: Leaf
  },
  {
    phase: 4,
    title: 'Digestion',
    subtitle: 'Timing & combinations',
    desc: 'Eating at the right time and in the right way to optimize metabolic fire (Agni).',
    icon: Clock
  },
  {
    phase: 5,
    title: 'Absorption',
    subtitle: 'Rest & rhythm',
    desc: 'Allowing the body space to assimilate nutrients through calm and regularity.',
    icon: Activity
  },
  {
    phase: 6,
    title: 'Integration',
    subtitle: 'Carrying habits home',
    desc: 'Transforming temporary diet changes into lasting lifestyle wisdom.',
    icon: HeartHandshake
  }
];

// Conscious Dining Spaces Data (Exact Verbatim Copy)
const diningSpacesList = [
  {
    pill: 'Sauhithya',
    title: 'Indoor Dining',
    tag: 'Balance · Calm · Awareness',
    image: '/assets/nutrition/indoor-dining.jpg',
    desc: 'A serene indoor dining space designed to encourage slow, mindful eating. Sauhithya supports proper digestion through silence, simplicity, and an atmosphere of calm focus. Traditional floor seating options are available.'
  },
  {
    pill: 'Santrupthi',
    title: 'Outdoor Dining',
    tag: 'Fulfilment · Nature · Openness',
    image: '/assets/nutrition/outdoor-dining.jpg',
    desc: "Set by the riverside, Santrupthi allows guests to dine amidst nature's embrace. Eating in this serene setting enhances prana, grounding, and a deeper connection with the elements. Traditional floor seating options are available."
  },
  {
    pill: 'Surasa',
    title: 'Juice & Wellness Beverage Bar',
    tag: 'Essence · Vitality · Detox',
    image: '/assets/nutrition/juice-bar.jpg',
    desc: 'A dedicated space for cold-pressed juices, herbal infusions, and therapeutic drinks. Surasa supports detoxification, hydration, metabolism, and gentle cleansing.'
  }
];

// Wholesome Cuisines List (Exact Verbatim Copy)
const cuisinesList = [
  "Regional Indian meals prepared fresh",
  "Light Oriental-inspired dishes",
  "Clean Western nourishment",
  "Middle Eastern flavours",
  "Sprouts, fruits, and seasonal salads",
  "Herbal infusions and wellness beverages"
];

// Therapeutic Nutrition Principles (Exact Verbatim Copy)
const nutritionPrinciplesList = [
  {
    title: 'Body Type-Aligned Meals',
    desc: 'Food adapted to your unique body type and current state of balance.',
    icon: Activity
  },
  {
    title: 'Seasonal Eating',
    desc: 'Menus evolve with nature’s cycles for optimal digestion.',
    icon: Sun
  },
  {
    title: 'Mindful Preparation',
    desc: 'Cooking with intention, freshness, and minimal processing.',
    icon: Utensils
  },
  {
    title: 'Timing & Rhythm',
    desc: 'Meals aligned with your daily Dinacharya.',
    icon: Clock
  },
  {
    title: 'Bioavailability',
    desc: 'Food combinations that enhance absorption and synergy.',
    icon: Leaf
  },
  {
    title: 'Emotional Nourishment',
    desc: 'Peaceful dining spaces that calm the mind.',
    icon: HeartHandshake
  }
];

export default function Nutrition({ onNavigate }) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeDiningSpace, setActiveDiningSpace] = useState(0);

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end start'] });
  const heroMandalaRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div ref={scrollRef} style={{ backgroundColor: 'var(--isabelline)', color: 'var(--raisin-black)', overflowX: 'hidden' }}>
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION • Clean Botanical Sage Tone with Emblem and Reveal Headline */}
      {/* ========================================================================= */}
      <section style={{
        boxSizing: 'border-box',
        padding: '5.5rem 6% 3.5rem 6%',
        background: 'linear-gradient(135deg, #dce4d8 0%, #c8d6c3 50%, #b8c8b2 100%)',
        color: 'var(--wine)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {/* Botanical Leaf SVG Watermarks */}
        <Pattern24 style={{ position: 'absolute', top: '-20px', left: '-40px', width: '280px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />
        <Pattern25 style={{ position: 'absolute', bottom: '-20px', right: '-40px', width: '280px', opacity: 0.1, color: 'var(--wine)', pointerEvents: 'none' }} />

        {/* Ambient Wine/Gold Soft Bokeh Glows */}
        <div style={{ position: 'absolute', top: '-10%', left: '15%', maxWidth: '450px', width: '100%', height: '450px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.06) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(60px)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '15%', maxWidth: '500px', width: '100%', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(220,160,50,0.08) 0%, rgba(220,160,50,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />

        {/* Rotating Background Mandala Watermark */}
        <motion.div
          style={{
            rotate: heroMandalaRotate,
            position: 'absolute',
            top: '50%', left: '50%',
            x: '-50%', y: '-50%',
            width: 'clamp(320px, 75vw, 520px)', height: 'clamp(320px, 75vw, 520px)',
            opacity: 0.08,
            pointerEvents: 'none',
            zIndex: 0
          }}
        >
          <Pattern27 style={{ width: '100%', height: '100%', color: 'var(--wine)' }} />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={wordRevealContainer}
          style={{ position: 'relative', zIndex: 2, maxWidth: '840px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          {/* Official Suprada Emblem Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            style={{ marginBottom: '1.2rem', display: 'flex', justifyContent: 'center' }}
          >
            <img 
              src="/assets/extracted/logo.svg" 
              alt="Suprada Official Emblem Logo" 
              style={{ height: '82px', width: 'auto', filter: 'drop-shadow(0 4px 12px rgba(94, 39, 53, 0.12))' }} 
            />
          </motion.div>

          {/* Word-by-Word Revealed Main Headline */}
          <h1 style={{
            color: 'var(--wine)', 
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--fs-hero)',
            fontWeight: 700,
            margin: '0.4rem 0 1.2rem 0', 
            lineHeight: 1.18, 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.55rem', 
            flexWrap: 'wrap'
          }}>
            {['Nutrition', '&', 'Wellness'].map((w, idx) => (
              <motion.span
                key={idx}
                variants={wordVariant}
                style={{ display: 'inline-block' }}
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              variants={wordVariant}
              style={{ display: 'inline-block', fontStyle: 'italic', color: 'var(--redwood)' }}
            >
              Cuisine
            </motion.span>
            {['at', 'Suprada'].map((w, idx) => (
              <motion.span
                key={idx}
                variants={wordVariant}
                style={{ display: 'inline-block' }}
              >
                {w}
              </motion.span>
            ))}
          </h1>

          {/* Hero Paragraph with Smooth Fade Landing */}
          <motion.p
            variants={wordVariant}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              color: 'var(--wine)',
              opacity: 0.9,
              lineHeight: 1.7,
              maxWidth: '720px',
              margin: '0 auto',
              fontWeight: 400
            }}
          >
            At Suprada, food is not an indulgence — it is a daily practice of healing, awareness, and balance. Every meal is designed to support digestion, vitality, and inner harmony.
          </motion.p>
        </motion.div>

        {/* Scroll Cue Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            position: 'absolute', bottom: '1.2rem', left: '50%',
            transform: 'translateX(-50%)', zIndex: 4
          }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem' }}
          >
            <span style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--wine)', opacity: 0.55, fontWeight: 700 }}>Scroll</span>
            <div style={{ width: '1px', height: '22px', background: 'linear-gradient(to bottom, var(--wine), transparent)', opacity: 0.35 }} />
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* 2. NOURISHMENT FOR BODY, MIND & SPIRIT (INTRO) */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        padding: 'clamp(3.5rem, 7vh, 5rem) 1.5rem',
        backgroundColor: '#F7F5F0',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionOverline text="WELLNESS DINING & NUTRITION AT SUPRADA" />

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '0.6rem',
              color: 'var(--wine)'
            }}>
              Nourishment for Body, <span style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Mind &amp; Spirit</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              color: 'var(--wine)',
              opacity: 0.9,
              maxWidth: '780px',
              margin: '0.8rem auto 0 auto',
              lineHeight: 1.75,
              fontWeight: 400
            }}>
              At Suprada Wellness, nourishment goes beyond calories and taste. Food is a conscious practice — one that supports digestion, strengthens immunity, calms the mind, and nurtures the spirit. Every meal is thoughtfully designed to work in harmony with your body’s natural intelligence and your personalized wellness journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OUR NUTRITION PHILOSOPHY */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        padding: 'clamp(3.5rem, 7vh, 5rem) 1.5rem',
        backgroundColor: '#F7F5F0',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          >
            <SectionOverline text="PHILOSOPHY" />

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '0.4rem',
              color: 'var(--wine)'
            }}>
              Our Nutrition <span style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Philosophy</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              color: 'var(--wine)',
              opacity: 0.88,
              margin: '0.4rem auto 0 auto',
              lineHeight: 1.6
            }}>
              Designed to help you make better food choices — for life
            </p>
          </motion.div>

          {/* 2-Column: Left Video/Image with Zoom, Right Exact Paragraphs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'center'
          }}>
            
            {/* Left Image with Smooth Hover Zoom */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(94, 39, 53, 0.1)',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)',
                  backgroundColor: '#FFFFFF'
                }}
              >
                <img 
                  src="/assets/nutrition/prescribed-nutrition.jpg" 
                  alt="Our Nutrition Philosophy" 
                  style={{
                    width: '100%',
                    height: 'clamp(300px, 40vh, 400px)',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Right 3 Paragraphs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-body)',
                color: 'var(--wine)',
                lineHeight: 1.75,
                fontWeight: 500,
                display: 'flex',
                flexDirection: 'column',
                gap: '1.4rem'
              }}
            >
              <p style={{ margin: 0 }}>
                We believe that true wellness begins in the gut. Often referred to as the body’s second brain, the gastrointestinal system plays a vital role in energy levels, emotional balance, immunity, and long-term health.
              </p>
              <p style={{ margin: 0 }}>
                At Suprada, nutrition is not restrictive — it is restorative. By aligning mindful eating with natural, wholesome foods, we support the body’s innate ability to heal and rebalance itself.
              </p>
              <p style={{ margin: 0 }}>
                Diet and nutrition form the foundation on which the body, mind, senses, and spirit come into alignment.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ANCIENT SANSKRIT CARD: YOU ARE WHAT YOU EAT (Soft Clean Luxury) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(1.5rem, 3.5vh, 2.5rem) 1.5rem',
        backgroundColor: '#F7F5F0'
      }}>
        <div style={{ maxWidth: '980px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="nutrition-shloka-card"
            style={{
              position: 'relative',
              background: '#FFFFFF',
              borderRadius: '1.5rem',
              border: '1.5px solid rgba(212, 175, 55, 0.45)',
              boxShadow: '0 12px 35px rgba(94, 39, 53, 0.06)',
              overflow: 'hidden',
              padding: 'clamp(1.2rem, 4vw, 3rem) clamp(1rem, 3.5vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            {/* Left Decorative Corner SVG */}
            <CornerFlourish className="shloka-flourish" style={{ width: 'clamp(40px, 7vw, 80px)', height: 'clamp(80px, 14vw, 160px)', color: 'var(--harvest-gold)', opacity: 0.65, flexShrink: 0 }} />

            {/* Center Sanskrit Quote Content */}
            <div className="shloka-center-content" style={{
              flexGrow: 1,
              textAlign: 'center',
              maxWidth: '680px',
              position: 'relative',
              padding: '0 0.4rem'
            }}>
              <p className="shloka-title-text" style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h3)',
                color: 'var(--wine)',
                fontWeight: 600,
                fontStyle: 'italic',
                margin: '0 0 0.5rem 0'
              }}>
                You are what you eat
              </p>

              {/* Shloka Line in 1 Single Line */}
              <div className="shloka-sanskrit-container" style={{ margin: '0.6rem 0' }}>
                <p className="shloka-sanskrit-line" style={{
                  fontFamily: 'serif',
                  fontSize: 'clamp(1.15rem, 2.2vw, 1.85rem)',
                  color: 'var(--wine)',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  margin: '0 0 0.2rem 0',
                  whiteSpace: 'nowrap'
                }}>
                  आहारशुद्धौ सत्त्वशुद्धिः।
                </p>
                <p className="shloka-translit-line" style={{
                  fontSize: 'clamp(0.72rem, 1.3vw, 0.88rem)',
                  color: 'var(--redwood)',
                  fontStyle: 'italic',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}>
                  Ahāraśuddhau sattvaśuddhiḥ.
                </p>
              </div>

              {/* Explanation in 2 Lines: Total 3 Lines */}
              <div className="shloka-explanation-container" style={{
                paddingTop: '0.6rem',
                borderTop: '1px solid rgba(212, 175, 55, 0.25)',
                width: '85%',
                margin: '0.6rem auto 0'
              }}>
                <p className="shloka-explanation-text" style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--wine)',
                  fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)',
                  letterSpacing: '0.02em',
                  fontWeight: 500,
                  lineHeight: 1.45,
                  margin: 0
                }}>
                  (When food is pure,<br />the mind becomes pure.)
                </p>
              </div>
            </div>

            {/* Right Decorative Corner SVG */}
            <CornerFlourish className="shloka-flourish" style={{ width: 'clamp(40px, 7vw, 80px)', height: 'clamp(80px, 14vw, 160px)', color: 'var(--harvest-gold)', opacity: 0.65, flexShrink: 0 }} inverted />
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE NOURISHMENT JOURNEY (Horizontal Sanctum Zones Interactive Flow) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(3.5rem, 7vh, 5.5rem) 1.5rem',
        background: 'linear-gradient(135deg, #c8ceaa 0%, #b3ba8e 60%, #a3aa7e 100%)',
        color: 'var(--wine)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle Watermark Flourish */}
        <Pattern27 style={{ position: 'absolute', right: '-100px', top: '50%', transform: 'translateY(-50%)', width: '400px', height: '400px', opacity: 0.08, color: 'var(--wine)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1080px', width: '100%', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2rem' }}
          >
            <SectionOverline text="THE PATH" />

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '0.4rem',
              color: 'var(--wine)'
            }}>
              The Nourishment <span style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Journey</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              color: 'var(--wine)',
              opacity: 0.9,
              maxWidth: '620px',
              margin: '0.4rem auto 0 auto',
              lineHeight: 1.6
            }}>
              A guided path for mindful eating, gut restoration, and sustainable health.
            </p>
          </motion.div>

          {/* Horizontal Step Selector Tabs (Sanctum Zones Style) - Single Line for Mobile & Laptop */}
          <div 
            className="journey-phase-tabs single-line-horizontal-tabs no-scrollbar" 
            style={{ 
              display: 'flex', 
              flexDirection: 'row',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              gap: '0.55rem', 
              padding: '0.4rem 0.5rem',
              marginBottom: '2rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            {journeySteps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.phase}
                  onClick={() => setActiveStep(idx)}
                  className="journey-phase-btn"
                  style={{
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    padding: '0.6rem 1.15rem',
                    borderRadius: '24px',
                    border: isActive ? '2px solid var(--wine)' : '1.5px solid rgba(94, 39, 53, 0.25)',
                    backgroundColor: isActive ? 'var(--wine)' : 'rgba(255, 255, 255, 0.85)',
                    color: isActive ? '#ffffff' : 'var(--wine)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 6px 18px rgba(94, 39, 53, 0.2)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem'
                  }}
                >
                  <span style={{ 
                    width: '19px', 
                    height: '19px', 
                    borderRadius: '50%', 
                    backgroundColor: isActive ? '#ffffff' : 'var(--wine)', 
                    color: isActive ? 'var(--wine)' : '#ffffff',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.68rem', 
                    fontWeight: 800 
                  }}>
                    {step.phase}
                  </span>
                  <span>{step.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                borderRadius: '1.5rem',
                border: '1.5px solid rgba(94, 39, 53, 0.18)',
                boxShadow: '0 12px 35px rgba(94, 39, 53, 0.1)',
                padding: 'clamp(2rem, 5vw, 3.5rem)',
                maxWidth: '780px',
                margin: '0 auto',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              {/* Step Phase Number Indicator */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: 'rgba(94, 39, 53, 0.08)',
                padding: '0.35rem 1rem',
                borderRadius: '50px',
                marginBottom: '1rem',
                color: 'var(--wine)',
                fontSize: 'var(--fs-small)',
                fontWeight: 800,
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>
                <span>Phase {journeySteps[activeStep].phase} of 6</span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h2)',
                fontWeight: 700,
                color: 'var(--wine)',
                margin: '0 0 0.35rem 0'
              }}>
                {journeySteps[activeStep].title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-small)',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
                color: 'var(--redwood)',
                fontWeight: 700,
                margin: '0 0 1.2rem 0'
              }}>
                {journeySteps[activeStep].subtitle}
              </p>

              <div style={{
                width: '50px',
                height: '2px',
                backgroundColor: 'var(--harvest-gold)',
                margin: '0 auto 1.5rem auto'
              }} />

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-body)',
                color: 'var(--wine)',
                lineHeight: 1.75,
                fontWeight: 500,
                maxWidth: '620px',
                margin: '0 auto 2rem auto'
              }}>
                {journeySteps[activeStep].desc}
              </p>

              {/* Navigation Controls (Prev / Next) */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                <button
                  onClick={() => setActiveStep(prev => (prev === 0 ? journeySteps.length - 1 : prev - 1))}
                  style={{
                    padding: '0.65rem 1.3rem',
                    borderRadius: '30px',
                    border: '1.5px solid var(--wine)',
                    backgroundColor: 'transparent',
                    color: 'var(--wine)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontWeight: 700,
                    fontSize: 'var(--fs-small)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine)'; e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--wine)'; }}
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setActiveStep(prev => (prev === journeySteps.length - 1 ? 0 : prev + 1))}
                  style={{
                    padding: '0.65rem 1.4rem',
                    borderRadius: '30px',
                    border: 'none',
                    backgroundColor: 'var(--wine)',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontWeight: 700,
                    fontSize: 'var(--fs-small)',
                    boxShadow: '0 4px 12px rgba(94, 39, 53, 0.2)',
                    transition: 'all 0.25s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#7a3142'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine)'; }}
                >
                  <span>Next Phase</span>
                  <ChevronRight size={16} />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PRESCRIBED NUTRITION (THE SCIENCE OF FOOD) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(3.5rem, 7vh, 5rem) 1.5rem',
        backgroundColor: '#F7F5F0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'center'
          }}>
            
            {/* Left Image with "Doctor Prescribed" overlay badge & Zoom Interaction */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: '0 16px 35px rgba(94, 39, 53, 0.1)',
                  border: '1.5px solid rgba(94, 39, 53, 0.12)'
                }}
              >
                <img 
                  src="/assets/nutrition/hero-nutrition.jpg" 
                  alt="Prescribed Nutrition" 
                  style={{
                    width: '100%',
                    height: 'clamp(320px, 42vh, 420px)',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  left: '1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.55rem 1.3rem',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                  <span style={{
                    color: 'var(--wine)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 'var(--fs-h4)'
                  }}>
                    Doctor Prescribed
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Exact Description & 3 Bullet items */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <SectionOverline text="THE SCIENCE OF FOOD" />

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'var(--fs-h2)',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: '0.4rem',
                textAlign: 'left',
                color: 'var(--wine)'
              }}>
                Prescribed <span style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Nutrition</span>
              </h2>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-body)',
                color: 'var(--wine)',
                opacity: 0.9,
                lineHeight: 1.7,
                margin: '0.8rem 0 1.6rem 0'
              }}>
                Unlike standard resorts, your menu at Suprada isn't chosen by preference alone—it is carefully curated by your wellness doctor. Based on your diagnostics (Holistic Health Assessment) and wellness goals, our chefs prepare meals that act as precise medicine for your body type.
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(94, 39, 53, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--wine)',
                    flexShrink: 0
                  }}>
                    <Leaf size={18} />
                  </div>
                  <span style={{ color: 'var(--wine)', fontWeight: 600, fontSize: 'var(--fs-body)' }}>
                    Ingredients selected for your Body Type
                  </span>
                </li>

                <li style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(94, 39, 53, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--wine)',
                    flexShrink: 0
                  }}>
                    <Clock size={18} />
                  </div>
                  <span style={{ color: 'var(--wine)', fontWeight: 600, fontSize: 'var(--fs-body)' }}>
                    Timed to optimize metabolic fire (Agni)
                  </span>
                </li>

                <li style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(94, 39, 53, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--wine)',
                    flexShrink: 0
                  }}>
                    <Droplets size={18} />
                  </div>
                  <span style={{ color: 'var(--wine)', fontWeight: 600, fontSize: 'var(--fs-body)' }}>
                    Calorie and nutrient calibrated
                  </span>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. DINING SPACES FOR CONSCIOUS NOURISHMENT (Unified 1-Section Interactive Showcase) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(3.5rem, 7vh, 5.5rem) 1.5rem',
        backgroundColor: '#F2ECE4',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '2.2rem' }}
          >
            <SectionOverline text="DINING SPACES" />

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '0.4rem',
              color: 'var(--wine)'
            }}>
              Dining Spaces <span style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>for Conscious Nourishment</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              color: 'var(--wine)',
              opacity: 0.88,
              maxWidth: '660px',
              margin: '0.4rem auto 0 auto',
              lineHeight: 1.6
            }}>
              Different spaces for different modes of healing—from silent indoor dining to communal outdoor feasts.
            </p>
          </motion.div>

          {/* Dining Space Tabs (Clean 1-Section Switcher matching Sanctum Zones style) - Single Line for Mobile & Laptop */}
          <div 
            className="dining-space-tabs single-line-horizontal-tabs no-scrollbar" 
            style={{ 
              display: 'flex', 
              flexDirection: 'row',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              gap: '0.55rem', 
              padding: '0.4rem 0.5rem',
              marginBottom: '2.2rem',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box'
            }}
          >
            {diningSpacesList.map((space, idx) => {
              const isActive = activeDiningSpace === idx;
              return (
                <button
                  key={space.pill}
                  onClick={() => setActiveDiningSpace(idx)}
                  style={{
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    padding: '0.6rem 1.25rem',
                    borderRadius: '30px',
                    border: isActive ? '2px solid var(--wine)' : '1.5px solid rgba(94, 39, 53, 0.22)',
                    backgroundColor: isActive ? 'var(--wine)' : 'rgba(255, 255, 255, 0.85)',
                    color: isActive ? '#ffffff' : 'var(--wine)',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 6px 18px rgba(94, 39, 53, 0.18)' : 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}
                >
                  <span>✦</span>
                  <span>{space.pill} ({space.title})</span>
                </button>
              );
            })}
          </div>

          {/* Active Space Showcase (Unified 1 Screen View) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDiningSpace}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '1.5rem',
                border: '1.5px solid rgba(94, 39, 53, 0.15)',
                boxShadow: '0 15px 40px rgba(94, 39, 53, 0.08)',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
                overflow: 'hidden'
              }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                gap: 'clamp(1.8rem, 4vw, 3rem)',
                alignItems: 'center'
              }}>
                {/* Image Column with Smooth Zoom Interaction */}
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'relative',
                    borderRadius: '1.25rem',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(94, 39, 53, 0.12)',
                    backgroundColor: '#FAF5EE'
                  }}
                >
                  <img 
                    src={diningSpacesList[activeDiningSpace].image} 
                    alt={diningSpacesList[activeDiningSpace].title} 
                    style={{
                      width: '100%',
                      height: 'clamp(280px, 38vh, 380px)',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  {/* Top Right Tag Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.35rem 0.95rem',
                    borderRadius: '50px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <span style={{
                      fontSize: 'var(--fs-small)',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      color: 'var(--wine)',
                      textTransform: 'uppercase'
                    }}>
                      {diningSpacesList[activeDiningSpace].tag}
                    </span>
                  </div>
                </motion.div>

                {/* Text Column */}
                <div style={{ textAlign: 'left' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.9rem',
                    backgroundColor: 'var(--wine)',
                    color: 'var(--harvest-gold)',
                    fontSize: 'var(--fs-small)',
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    borderRadius: '50px',
                    marginBottom: '0.75rem',
                    boxShadow: '0 2px 8px rgba(94, 39, 53, 0.15)'
                  }}>
                    {diningSpacesList[activeDiningSpace].pill}
                  </span>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--fs-h2)',
                    fontWeight: 700,
                    color: 'var(--wine)',
                    margin: '0 0 0.8rem 0'
                  }}>
                    {diningSpacesList[activeDiningSpace].title}
                  </h3>

                  <div style={{
                    width: '45px',
                    height: '2px',
                    backgroundColor: 'var(--harvest-gold)',
                    marginBottom: '1.2rem'
                  }} />

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-body)',
                    color: 'var(--wine)',
                    opacity: 0.9,
                    lineHeight: 1.8,
                    fontWeight: 500,
                    marginBottom: '1.8rem'
                  }}>
                    {diningSpacesList[activeDiningSpace].desc}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <button
                      onClick={() => onNavigate && onNavigate('gallery')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--wine)',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        fontSize: 'var(--fs-small)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.4rem 0',
                        transition: 'color 0.25s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--redwood)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--wine)'; }}
                    >
                      <span>View Gallery</span>
                      <ArrowRight size={16} />
                    </button>

                    {/* Quick Space Cycler Buttons */}
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setActiveDiningSpace(prev => (prev === 0 ? diningSpacesList.length - 1 : prev - 1))}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          border: '1.5px solid var(--wine)',
                          backgroundColor: 'transparent',
                          color: 'var(--wine)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine)'; e.currentTarget.style.color = '#FFFFFF'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--wine)'; }}
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <button
                        onClick={() => setActiveDiningSpace(prev => (prev === diningSpacesList.length - 1 ? 0 : prev + 1))}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          border: '1.5px solid var(--wine)',
                          backgroundColor: 'transparent',
                          color: 'var(--wine)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--wine)'; e.currentTarget.style.color = '#FFFFFF'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--wine)'; }}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. WHOLESOME CUISINES, THOUGHTFULLY ADAPTED (Wine Background) */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(4rem, 8vh, 6rem) 1.5rem',
        backgroundColor: 'var(--wine)',
        color: '#FFFFFF',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <CornerFlourish style={{ position: 'absolute', top: 0, right: 0, width: 'clamp(120px, 20vw, 220px)', height: 'clamp(240px, 35vw, 400px)', color: '#FFFFFF', opacity: 0.1 }} inverted />

        <div style={{ maxWidth: '980px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '2.5rem' }}
          >
            <SectionOverline text="CUISINE" light />

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '0.4rem',
              color: '#FFFFFF'
            }}>
              Wholesome Cuisines, <span style={{ fontStyle: 'italic', color: 'var(--harvest-gold)' }}>Thoughtfully Adapted</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              color: 'rgba(255, 255, 255, 0.88)',
              maxWidth: '750px',
              margin: '0.6rem auto 1.5rem auto',
              lineHeight: 1.7
            }}>
              Our wellness cuisine draws inspiration from diverse global traditions — all adapted to align with Suprada’s principles of natural, satwik, and therapeutic eating.
            </p>
          </motion.div>

          {/* 6 Grid Cards - Horizontally scrollable on mobile */}
          <div className="nutrition-cuisines-grid no-scrollbar">
            {cuisinesList.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -4, backgroundColor: 'rgba(255, 255, 255, 0.18)' }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  padding: '1.5rem',
                  borderRadius: '1rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.25s ease'
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--fs-body)',
                  fontWeight: 600,
                  color: '#FFFFFF',
                  margin: 0,
                  lineHeight: 1.5
                }}>
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-body)',
            color: 'rgba(255, 255, 255, 0.82)',
            fontStyle: 'italic',
            margin: 0
          }}>
            Every recipe is researched, developed, and prepared to ensure food remains both healing and enjoyable.
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. THERAPEUTIC NUTRITION PRINCIPLES */}
      {/* ========================================================================= */}
      <section style={{
        padding: 'clamp(4rem, 8vh, 6rem) 1.5rem',
        backgroundColor: '#F7F5F0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <SectionOverline text="PRINCIPLES" />

            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '0.4rem',
              color: 'var(--wine)'
            }}>
              Therapeutic <span style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>Nutrition Principles</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              color: 'var(--wine)',
              opacity: 0.88,
              margin: '0.4rem auto 0 auto',
              lineHeight: 1.6
            }}>
              Guiding rules that transform every meal into medicine for the body and clarity for the mind.
            </p>
          </motion.div>

          {/* 6 Principle Cards - Horizontally scrollable on mobile */}
          <div className="nutrition-principles-grid no-scrollbar">
            {nutritionPrinciplesList.map((principle, idx) => {
              const PrincipleIcon = principle.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(94, 39, 53, 0.1)' }}
                  style={{
                    backgroundColor: '#FFFFFF',
                    padding: '1.6rem',
                    borderRadius: '1.25rem',
                    border: '1.5px solid rgba(94, 39, 53, 0.12)',
                    boxShadow: '0 4px 15px rgba(94, 39, 53, 0.04)',
                    display: 'flex',
                    gap: '1.2rem',
                    alignItems: 'flex-start',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(94, 39, 53, 0.08)',
                    color: 'var(--wine)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <PrincipleIcon size={20} />
                  </div>

                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: 'var(--fs-h3)',
                      fontWeight: 700,
                      color: 'var(--wine)',
                      margin: '0 0 0.35rem 0'
                    }}>
                      {principle.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--fs-body)',
                      color: 'var(--wine)',
                      opacity: 0.9,
                      lineHeight: 1.6,
                      fontWeight: 500,
                      margin: 0
                    }}>
                      {principle.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. CALL TO ACTION (REDISCOVER THE JOY OF EATING WELL) */}
      {/* ========================================================================= */}
      <section style={{
        position: 'relative',
        padding: 'clamp(4.5rem, 9vh, 6.5rem) 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: '#F7F5F0'
      }}>
        {/* Ambient Glow */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(94,39,53,0.05) 0%, rgba(94,39,53,0) 70%)', filter: 'blur(70px)', zIndex: 0, pointerEvents: 'none' }} />

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '760px',
          margin: '0 auto',
          color: 'var(--wine)'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--fs-h2)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: '0.8rem',
              color: 'var(--wine)'
            }}>
              Rediscover the Joy <span style={{ fontStyle: 'italic', color: 'var(--redwood)' }}>of Eating Well</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--fs-body)',
              color: 'var(--wine)',
              opacity: 0.9,
              lineHeight: 1.7,
              maxWidth: '680px',
              margin: '0 auto 2rem auto'
            }}>
              At Suprada, nutrition becomes a life skill — one that nourishes the body, calms the mind, and supports lasting wellness beyond your stay.
            </p>

            {/* Exactly 2 Buttons matching the reference website */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '1.2rem',
              flexWrap: 'wrap'
            }}>
              <motion.button
                onClick={() => onNavigate && onNavigate('stay')}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  minWidth: '220px',
                  padding: '0.85rem 2rem',
                  backgroundColor: 'var(--wine)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(94, 39, 53, 0.25)',
                  transition: 'all 0.3s ease'
                }}
              >
                Plan Your Wellness Stay
              </motion.button>

              <motion.button
                onClick={() => onNavigate && onNavigate('programmes/packages')}
                whileHover={{ scale: 1.04, backgroundColor: 'var(--wine)', color: '#FFFFFF' }}
                whileTap={{ scale: 0.96 }}
                style={{
                  minWidth: '220px',
                  padding: '0.85rem 2rem',
                  backgroundColor: 'transparent',
                  border: '1.5px solid var(--wine)',
                  color: 'var(--wine)',
                  borderRadius: '30px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Explore Programs &amp; Packages
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
