// Using if else
let pickIf = (code) => {
  if (code === 'AU') {
    return 'Australia'
  } else if (code === 'US') {
    return 'United Sates'
  } else if (code === 'CN') {
    return 'China'
  } else if (code === 'NZ') {
    return 'New Zealand'
  } else {
    return 'Unknown'
  }
}

// Using switch
let pickSwitch = (code) => {
  switch (code) {
    case 'AU':
      return 'Australia';
    case 'US':
      return 'United States';
    case 'UK':
      return 'United Kingdom';
    case 'CN':
      return 'China';
    case 'NZ':
      return 'New Zealand';
    default:
      return 'Unknown'
  }
}

// Use object picker
let pickObj = (code) => {
  let cases = {
    'AU': 'Australia',
    'US': 'United States',
    'UK': 'United Kingdom',
    'CN': 'China',
    'NZ': 'New Zealand'
  }
  return cases.hasOwnProperty(code) ? cases[code] : 'Unknown'
}

