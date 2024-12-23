import React from "react";

export function IconDownArrow(props) {
  return (
    <svg
      fill="#000"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.011 512.011"
      xmlSpace="preserve"
      {...props}
    >
      <path d="M505.755 123.592c-8.341-8.341-21.824-8.341-30.165 0L256.005 343.176 36.421 123.592c-8.341-8.341-21.824-8.341-30.165 0s-8.341 21.824 0 30.165l234.667 234.667a21.275 21.275 0 0015.083 6.251 21.275 21.275 0 0015.083-6.251l234.667-234.667c8.34-8.341 8.34-21.824-.001-30.165z" />
    </svg>
  );
}

export function IconUpArrow(props) {
  return (
    <svg
      fill="#000"
      height="200px"
      width="200px"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.011 512.011"
      xmlSpace="preserve"
      transform="scale(1 -1)"
      {...props}
    >
      <path d="M505.755 123.592c-8.341-8.341-21.824-8.341-30.165 0L256.005 343.176 36.421 123.592c-8.341-8.341-21.824-8.341-30.165 0s-8.341 21.824 0 30.165l234.667 234.667a21.275 21.275 0 0015.083 6.251 21.275 21.275 0 0015.083-6.251l234.667-234.667c8.34-8.341 8.34-21.824-.001-30.165z" />
    </svg>
  );
}

export function IconPicture(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="#0F1729">
        <path d="M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.005 2h1.99c1.386 0 2.488 0 3.377.074.91.075 1.686.234 2.394.602a6 6 0 012.559 2.558c.367.709.526 1.484.601 2.394.074.89.074 1.991.074 3.377v1.99c0 .69 0 1.311-.01 1.87.015.103.013.208-.005.31-.01.437-.029.835-.059 1.197-.075.91-.233 1.686-.601 2.394a6 6 0 01-2.56 2.559c-.707.367-1.483.526-2.393.601-.89.074-1.992.074-3.377.074h-1.99c-1.385 0-2.488 0-3.377-.074-.91-.075-1.685-.233-2.394-.601a6 6 0 01-2.558-2.56c-.368-.707-.527-1.483-.602-2.393C2 15.482 2 14.38 2 12.995v-1.99c0-1.386 0-2.488.074-3.377.075-.91.234-1.685.602-2.394a6 6 0 012.558-2.558c.709-.368 1.484-.527 2.394-.602C8.518 2 9.62 2 11.005 2zM20 11.05v1.462l-1.387-1.447a2 2 0 00-2.895.008l-4.667 4.92-1.536-1.857a2 2 0 00-3.135.067l-2.19 2.89a6.877 6.877 0 01-.123-.887C4 15.41 4 14.39 4 12.95v-1.9c0-1.44 0-2.46.067-3.256.065-.784.188-1.263.383-1.638A4 4 0 016.156 4.45c.375-.195.854-.318 1.638-.383C8.59 4 9.609 4 11.05 4h1.9c1.44 0 2.46 0 3.256.067.785.065 1.263.188 1.638.383a4 4 0 011.706 1.706c.195.375.318.854.383 1.638C20 8.59 20 9.609 20 11.05zm-13.844 8.5a4.002 4.002 0 01-.861-.603l2.68-3.536 1.535 1.857a2 2 0 002.992.101l4.667-4.92 2.81 2.93c-.01.302-.025.576-.046.827-.065.785-.188 1.263-.383 1.638a4 4 0 01-1.706 1.706c-.375.195-.854.318-1.638.383C15.41 20 14.39 20 12.95 20h-1.9c-1.44 0-2.46 0-3.256-.067-.784-.065-1.263-.188-1.638-.383z"
        />
      </g>
    </svg>
  );
}

export function IconEdit(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14 6l-6 6v4h4l6-6m-4-4l3-3 4 4-3 3m-4-4l4 4m-8-6H4v16h16v-6"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMenuChat(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="#1C274C">
        <path
          d="M8 12h.009m3.982 0H12m3.991 0H16"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.6.376 3.112 1.043 4.453.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 001.591 1.591l2.226-.595a1.634 1.634 0 011.149.133A9.958 9.958 0 0012 22z"
          strokeWidth={1.5}
        />
      </g>
    </svg>
  );
}

export function IconMenuChatActive(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.6.376 3.112 1.043 4.453.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 001.591 1.591l2.226-.595a1.634 1.634 0 011.149.133A9.958 9.958 0 0012 22z"
        fill="#1C274C"
      />
      <path
        d="M15 12a1 1 0 102 0 1 1 0 00-2 0zM11 12a1 1 0 102 0 1 1 0 00-2 0zM7 12a1 1 0 102 0 1 1 0 00-2 0z"
        fill="#fff"
      />
    </svg>
  );
}

export function IconMenuGroup(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="#1C274C" strokeWidth={1.5}>
        <circle cx={12} cy={6} r={4} />
        <path
          d="M18 9c1.657 0 3-1.12 3-2.5S19.657 4 18 4M6 9C4.343 9 3 7.88 3 6.5S4.343 4 6 4"
          strokeLinecap="round"
        />
        <ellipse cx={12} cy={17} rx={6} ry={4} />
        <path
          d="M20 19c1.754-.385 3-1.359 3-2.5s-1.246-2.115-3-2.5M4 19c-1.754-.385-3-1.359-3-2.5s1.246-2.115 3-2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function IconMenuGroupActive(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="#1C274C">
        <path d="M15.5 7.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM18 16.5c0 1.933-2.686 3.5-6 3.5s-6-1.567-6-3.5S8.686 13 12 13s6 1.567 6 3.5zM7.122 5c.178 0 .35.017.518.05A4.977 4.977 0 007 7.5c0 .868.221 1.685.61 2.396-.158.03-.32.045-.488.045-1.414 0-2.561-1.106-2.561-2.47C4.561 6.106 5.708 5 7.122 5zM5.447 18.986C4.88 18.307 4.5 17.474 4.5 16.5c0-.944.357-1.756.896-2.423C3.49 14.225 2 15.267 2 16.529c0 1.275 1.517 2.325 3.447 2.457zM17 7.5c0 .868-.221 1.685-.61 2.396.157.03.32.045.488.045 1.414 0 2.56-1.106 2.56-2.47 0-1.365-1.146-2.471-2.56-2.471-.178 0-.35.017-.518.05.407.724.64 1.56.64 2.45zM18.553 18.986c1.93-.132 3.447-1.182 3.447-2.457 0-1.263-1.491-2.304-3.396-2.452.54.667.896 1.479.896 2.423 0 .974-.38 1.807-.947 2.486z" />
      </g>
    </svg>
  );
}

export function IconMenuFriend(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="#1C274C" strokeWidth={1.5}>
        <circle cx={9} cy={6} r={4} />
        <path d="M15 9a3 3 0 100-6" strokeLinecap="round" />
        <ellipse cx={9} cy={17} rx={7} ry={4} />
        <path
          d="M18 14c1.754.385 3 1.359 3 2.5 0 1.03-1.014 1.923-2.5 2.37"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function IconMenuFriendActive(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="#1C274C">
        <circle cx={9.00098} cy={6} r={4} />
        <ellipse cx={9.00098} cy={17.001} rx={7} ry={4} />
        <path d="M21 17c0 1.657-2.036 3-4.521 3 .732-.8 1.236-1.805 1.236-2.998 0-1.195-.505-2.2-1.239-3.001C18.962 14 21 15.344 21 17zM18 6a3 3 0 01-4.029 2.82A5.688 5.688 0 0014.714 6c0-1.025-.27-1.987-.742-2.819A3 3 0 0118 6.001z" />
      </g>
    </svg>
  );
}
