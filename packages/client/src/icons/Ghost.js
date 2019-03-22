import React from 'react'

export function Ghost ({ color }) {
  return (
    <svg
      height='240'
      viewBox='0 0 130 168'
      width='184.8'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M63.004.034C27.572 1.238 0 36.002 0 76.472v76.272c0 8.116 5.832 14.718 13 14.718s13-6.602 13-14.718c0-2.705 1.944-4.906 4.333-4.906 2.39 0 4.334 2.2 4.334 4.906 0 8.116 5.831 14.718 13 14.718 3.472 0 6.737-1.53 9.192-4.31 2.456-2.78 3.808-6.477 3.807-10.408 0-2.712 1.939-4.906 4.334-4.906 2.39 0 4.333 2.2 4.333 4.906 0 8.116 5.832 14.718 13 14.718 7.169 0 13-6.602 13-14.718 0-2.705 1.944-4.906 4.334-4.906 2.39 0 4.333 2.2 4.333 4.906 0 8.116 5.832 14.718 13 14.718s13-6.602 13-14.718V73.592c0-41.028-29.82-74.82-66.996-73.558z'
        fill={color}
      />
      <path
        d='M111.5 166.08c4.427-2.35 7.5-7.444 7.5-13.336V73.592C119 35.918 93.857 4.346 60.962.412a6.603 6.603 0 0 1 2.042-.378C100.181-1.228 130 32.564 130 73.592v79.152c0 8.116-5.832 14.718-13 14.718-1.965 0-3.829-.496-5.5-1.383z'
        fillOpacity='.1'
      />
      <g>
        <path d='M58 82.0000002c.00066667-1.14799989.26599997-2.26466645.7166666-3.29933301.67933326-1.55133318 1.77399982-2.93666638 3.18533302-3.97733294C63.3099995 73.688001 65.0693326 73.0000011 66.9999991 73.0000011c1.2839999-.0006667 2.5006664.306 3.579333.8166666 1.6199998.76866656 2.9426664 1.97733311 3.8893329 3.3946663.9419999 1.41866653 1.5266666 3.06533303 1.5313332 4.7886662C75.9999982 83.10466676 75.104665 84 73.9999984 84c-1.1046665 0-1.9999998-.89533324-1.9999998-1.9999998.0006667-.51933328-.126-1.11066656-.3833333-1.7006665-.3833333-.88666658-1.0639999-1.7506665-1.8866665-2.3513331-.8266665-.60533328-1.7613331-.94799991-2.7299997-.94799991-.6486666 0-1.2739999.15199999-1.8699998.43333329-.8926666.41799996-1.7073332 1.14733322-2.2699998 1.9959998-.5679999.84599992-.86466656 1.79333316-.85999989 2.57066642C61.99999961 83.10466676 61.10466636 84 59.9999998 84 58.89533325 84 58 83.10466676 58 82.0000002' />
        <g opacity='.2' transform='translate(34 72)'>
          <circle cx='3' cy='3' r='3' />
          <circle cx='63' cy='3' r='3' />
        </g>
        <path d='M90.4142136 63.03553391l-2.4748738-2.47487374c-.5857864-.58578644-.5857864-1.5355339 0-2.12132034.5857865-.58578644 1.5355339-.58578644 2.1213204 0l2.4748737 2.47487373 2.4748737-2.47487373c.5857865-.58578644 1.5355339-.58578644 2.1213204 0 .5857864.58578644.5857864 1.5355339 0 2.12132034l-2.4748738 2.47487374 2.4748738 2.47487373c.5857864.58578644.5857864 1.53553391 0 2.12132034-.5857865.58578642-1.5355339.58578642-2.1213204 0l-2.4748737-2.47487373-2.4748737 2.47487373c-.5857865.58578642-1.5355339.58578642-2.1213204 0-.5857864-.58578643-.5857864-1.5355339 0-2.12132034l2.4748738-2.47487373zM40.41421356 63.03553391l-2.47487373-2.47487374c-.58578644-.58578644-.58578644-1.5355339 0-2.12132034.58578644-.58578644 1.5355339-.58578644 2.12132034 0l2.47487374 2.47487373 2.47487373-2.47487373c.58578644-.58578644 1.53553391-.58578644 2.12132034 0 .58578642.58578644.58578642 1.5355339 0 2.12132034l-2.47487373 2.47487374 2.47487373 2.47487373c.58578642.58578644.58578642 1.53553391 0 2.12132034-.58578643.58578642-1.5355339.58578642-2.12132034 0l-2.47487373-2.47487373-2.47487374 2.47487373c-.58578644.58578642-1.5355339.58578642-2.12132034 0-.58578644-.58578643-.58578644-1.5355339 0-2.12132034l2.47487373-2.47487373z' />
      </g>
    </svg>
  )
}

Ghost.defaultProps = {
  color: '#ed5567'
}
