const countryList = [
  {
    code: "AF",
    label: "Afghanistan",
  },
  {
    code: "AL",
    label: "Albania",
  },
  {
    code: "DZ",
    label: "Algeria",
  },
  {
    code: "AX",
    label: "Alland Islands",
  },
  {
    code: "AS",
    label: "American Samoa",
  },
  {
    code: "AD",
    label: "Andorra",
  },
  {
    code: "AO",
    label: "Angola",
  },
  {
    code: "AI",
    label: "Anguilla",
  },
  {
    code: "AQ",
    label: "Antarctica",
  },
  {
    code: "AG",
    label: "Antigua and Barbuda",
  },
  {
    code: "AR",
    label: "Argentina",
  },
  {
    code: "AM",
    label: "Armenia",
  },
  {
    code: "AW",
    label: "Aruba",
  },
  {
    code: "AU",
    label: "Australia",
  },
  {
    code: "AT",
    label: "Austria",
  },
  {
    code: "AZ",
    label: "Azerbaijan",
  },
  {
    code: "BS",
    label: "Bahamas",
  },
  {
    code: "BH",
    label: "Bahrain",
  },
  {
    code: "BD",
    label: "Bangladesh",
  },
  {
    code: "BB",
    label: "Barbados",
  },
  {
    code: "BY",
    label: "Belarus",
  },
  {
    code: "BE",
    label: "Belgium",
  },
  {
    code: "BZ",
    label: "Belize",
  },
  {
    code: "BJ",
    label: "Benin",
  },
  {
    code: "BM",
    label: "Bermuda",
  },
  {
    code: "BT",
    label: "Bhutan",
  },
  {
    code: "BO",
    label: "Bolivia",
  },
  {
    code: "BA",
    label: "Bosnia and Herzegovina",
  },
  {
    code: "BW",
    label: "Botswana",
  },
  {
    code: "BV",
    label: "Bouvet Island",
  },
  {
    code: "BR",
    label: "Brazil",
  },
  {
    code: "IO",
    label: "British Indian Ocean Territory",
  },
  {
    code: "VG",
    label: "British Virgin Islands",
  },
  {
    code: "BN",
    label: "Brunei Darussalam",
  },
  {
    code: "BG",
    label: "Bulgaria",
  },
  {
    code: "BF",
    label: "Burkina Faso",
  },
  {
    code: "BI",
    label: "Burundi",
  },
  {
    code: "KH",
    label: "Cambodia",
  },
  {
    code: "CM",
    label: "Cameroon",
  },
  {
    code: "CA",
    label: "Canada",
  },
  {
    code: "CV",
    label: "Cape Verde",
  },
  {
    code: "KY",
    label: "Cayman Islands",
  },
  {
    code: "CF",
    label: "Central African Republic",
  },
  {
    code: "TD",
    label: "Chad",
  },
  {
    code: "CL",
    label: "Chile",
  },
  {
    code: "CN",
    label: "China",
  },
  {
    code: "CX",
    label: "Christmas Island",
  },
  {
    code: "CC",
    label: "Cocos (Keeling) Islands",
  },
  {
    code: "CO",
    label: "Colombia",
  },
  {
    code: "KM",
    label: "Comoros",
  },
  {
    code: "CD",
    label: "Congo, Democratic Republic of the",
  },
  {
    code: "CG",
    label: "Congo, Republic of the",
  },
  {
    code: "CK",
    label: "Cook Islands",
  },
  {
    code: "CR",
    label: "Costa Rica",
  },
  {
    code: "CI",
    label: "Cote d'Ivoire",
  },
  {
    code: "HR",
    label: "Croatia",
  },
  {
    code: "CU",
    label: "Cuba",
  },
  {
    code: "CW",
    label: "Curacao",
  },
  {
    code: "CY",
    label: "Cyprus",
  },
  {
    code: "CZ",
    label: "Czech Republic",
  },
  {
    code: "DK",
    label: "Denmark",
  },
  {
    code: "DJ",
    label: "Djibouti",
  },
  {
    code: "DM",
    label: "Dominica",
  },
  {
    code: "DO",
    label: "Dominican Republic",
  },
  {
    code: "EC",
    label: "Ecuador",
  },
  {
    code: "EG",
    label: "Egypt",
  },
  {
    code: "SV",
    label: "El Salvador",
  },
  {
    code: "GQ",
    label: "Equatorial Guinea",
  },
  {
    code: "ER",
    label: "Eritrea",
  },
  {
    code: "EE",
    label: "Estonia",
  },
  {
    code: "ET",
    label: "Ethiopia",
  },
  {
    code: "FK",
    label: "Falkland Islands (Malvinas)",
  },
  {
    code: "FO",
    label: "Faroe Islands",
  },
  {
    code: "FJ",
    label: "Fiji",
  },
  {
    code: "FI",
    label: "Finland",
  },
  {
    code: "FR",
    label: "France",
  },
  {
    code: "GF",
    label: "French Guiana",
  },
  {
    code: "PF",
    label: "French Polynesia",
  },
  {
    code: "TF",
    label: "French Southern Territories",
  },
  {
    code: "GA",
    label: "Gabon",
  },
  {
    code: "GM",
    label: "Gambia",
  },
  {
    code: "GE",
    label: "Georgia",
  },
  {
    code: "DE",
    label: "Germany",
  },
  {
    code: "GH",
    label: "Ghana",
  },
  {
    code: "GI",
    label: "Gibraltar",
  },
  {
    code: "GR",
    label: "Greece",
  },
  {
    code: "GL",
    label: "Greenland",
  },
  {
    code: "GD",
    label: "Grenada",
  },
  {
    code: "GP",
    label: "Guadeloupe",
  },
  {
    code: "GU",
    label: "Guam",
  },
  {
    code: "GT",
    label: "Guatemala",
  },
  {
    code: "GG",
    label: "Guernsey",
  },
  {
    code: "GN",
    label: "Guinea",
  },
  {
    code: "GW",
    label: "Guinea-Bissau",
  },
  {
    code: "GY",
    label: "Guyana",
  },
  {
    code: "HT",
    label: "Haiti",
  },
  {
    code: "HM",
    label: "Heard Island and McDonald Islands",
  },
  {
    code: "VA",
    label: "Holy See (Vatican City State)",
  },
  {
    code: "HN",
    label: "Honduras",
  },
  {
    code: "HK",
    label: "Hong Kong",
  },
  {
    code: "HU",
    label: "Hungary",
  },
  {
    code: "IS",
    label: "Iceland",
  },
  {
    code: "IN",
    label: "India",
  },
  {
    code: "ID",
    label: "Indonesia",
  },
  {
    code: "IR",
    label: "Iran, Islamic Republic of",
  },
  {
    code: "IQ",
    label: "Iraq",
  },
  {
    code: "IE",
    label: "Ireland",
  },
  {
    code: "IM",
    label: "Isle of Man",
  },
  {
    code: "IL",
    label: "Israel",
  },
  {
    code: "IT",
    label: "Italy",
  },
  {
    code: "JM",
    label: "Jamaica",
  },
  {
    code: "JP",
    label: "Japan",
  },
  {
    code: "JE",
    label: "Jersey",
  },
  {
    code: "JO",
    label: "Jordan",
  },
  {
    code: "KZ",
    label: "Kazakhstan",
  },
  {
    code: "KE",
    label: "Kenya",
  },
  {
    code: "KI",
    label: "Kiribati",
  },
  {
    code: "KP",
    label: "Korea, Democratic People's Republic of",
  },
  {
    code: "KR",
    label: "Korea, Republic of",
  },
  {
    code: "XK",
    label: "Kosovo",
  },
  {
    code: "KW",
    label: "Kuwait",
  },
  {
    code: "KG",
    label: "Kyrgyzstan",
  },
  {
    code: "LA",
    label: "Lao People's Democratic Republic",
  },
  {
    code: "LV",
    label: "Latvia",
  },
  {
    code: "LB",
    label: "Lebanon",
  },
  {
    code: "LS",
    label: "Lesotho",
  },
  {
    code: "LR",
    label: "Liberia",
  },
  {
    code: "LY",
    label: "Libya",
  },
  {
    code: "LI",
    label: "Liechtenstein",
  },
  {
    code: "LT",
    label: "Lithuania",
  },
  {
    code: "LU",
    label: "Luxembourg",
  },
  {
    code: "MO",
    label: "Macao",
  },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
  },
  {
    code: "MG",
    label: "Madagascar",
  },
  {
    code: "MW",
    label: "Malawi",
  },
  {
    code: "MY",
    label: "Malaysia",
  },
  {
    code: "MV",
    label: "Maldives",
  },
  {
    code: "ML",
    label: "Mali",
  },
  {
    code: "MT",
    label: "Malta",
  },
  {
    code: "MH",
    label: "Marshall Islands",
  },
  {
    code: "MQ",
    label: "Martinique",
  },
  {
    code: "MR",
    label: "Mauritania",
  },
  {
    code: "MU",
    label: "Mauritius",
  },
  {
    code: "YT",
    label: "Mayotte",
  },
  {
    code: "MX",
    label: "Mexico",
  },
  {
    code: "FM",
    label: "Micronesia, Federated States of",
  },
  {
    code: "MD",
    label: "Moldova, Republic of",
  },
  {
    code: "MC",
    label: "Monaco",
  },
  {
    code: "MN",
    label: "Mongolia",
  },
  {
    code: "ME",
    label: "Montenegro",
  },
  {
    code: "MS",
    label: "Montserrat",
  },
  {
    code: "MA",
    label: "Morocco",
  },
  {
    code: "MZ",
    label: "Mozambique",
  },
  {
    code: "MM",
    label: "Myanmar",
  },
  {
    code: "NA",
    label: "Namibia",
  },
  {
    code: "NR",
    label: "Nauru",
  },
  {
    code: "NP",
    label: "Nepal",
  },
  {
    code: "NL",
    label: "Netherlands",
  },
  {
    code: "NC",
    label: "New Caledonia",
  },
  {
    code: "NZ",
    label: "New Zealand",
  },
  {
    code: "NI",
    label: "Nicaragua",
  },
  {
    code: "NE",
    label: "Niger",
  },
  {
    code: "NG",
    label: "Nigeria",
  },
  {
    code: "NU",
    label: "Niue",
  },
  {
    code: "NF",
    label: "Norfolk Island",
  },
  {
    code: "MP",
    label: "Northern Mariana Islands",
  },
  {
    code: "NO",
    label: "Norway",
  },
  {
    code: "OM",
    label: "Oman",
  },
  {
    code: "PK",
    label: "Pakistan",
  },
  {
    code: "PW",
    label: "Palau",
  },
  {
    code: "PS",
    label: "Palestine, State of",
  },
  {
    code: "PA",
    label: "Panama",
  },
  {
    code: "PG",
    label: "Papua New Guinea",
  },
  {
    code: "PY",
    label: "Paraguay",
  },
  {
    code: "PE",
    label: "Peru",
  },
  {
    code: "PH",
    label: "Philippines",
  },
  {
    code: "PN",
    label: "Pitcairn",
  },
  {
    code: "PL",
    label: "Poland",
  },
  {
    code: "PT",
    label: "Portugal",
  },
  {
    code: "PR",
    label: "Puerto Rico",
  },
  {
    code: "QA",
    label: "Qatar",
  },
  {
    code: "RE",
    label: "Reunion",
  },
  {
    code: "RO",
    label: "Romania",
  },
  {
    code: "RU",
    label: "Russian Federation",
  },
  {
    code: "RW",
    label: "Rwanda",
  },
  {
    code: "BL",
    label: "Saint Barthelemy",
  },
  {
    code: "SH",
    label: "Saint Helena",
  },
  {
    code: "KN",
    label: "Saint Kitts and Nevis",
  },
  {
    code: "LC",
    label: "Saint Lucia",
  },
  {
    code: "MF",
    label: "Saint Martin (French part)",
  },
  {
    code: "PM",
    label: "Saint Pierre and Miquelon",
  },
  {
    code: "VC",
    label: "Saint Vincent and the Grenadines",
  },
  {
    code: "WS",
    label: "Samoa",
  },
  {
    code: "SM",
    label: "San Marino",
  },
  {
    code: "ST",
    label: "Sao Tome and Principe",
  },
  {
    code: "SA",
    label: "Saudi Arabia",
  },
  {
    code: "SN",
    label: "Senegal",
  },
  {
    code: "RS",
    label: "Serbia",
  },
  {
    code: "SC",
    label: "Seychelles",
  },
  {
    code: "SL",
    label: "Sierra Leone",
  },
  {
    code: "SG",
    label: "Singapore",
  },
  {
    code: "SX",
    label: "Sint Maarten (Dutch part)",
  },
  {
    code: "SK",
    label: "Slovakia",
  },
  {
    code: "SI",
    label: "Slovenia",
  },
  {
    code: "SB",
    label: "Solomon Islands",
  },
  {
    code: "SO",
    label: "Somalia",
  },
  {
    code: "ZA",
    label: "South Africa",
  },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
  },
  {
    code: "SS",
    label: "South Sudan",
  },
  {
    code: "ES",
    label: "Spain",
  },
  {
    code: "LK",
    label: "Sri Lanka",
  },
  {
    code: "SD",
    label: "Sudan",
  },
  {
    code: "SR",
    label: "Suriname",
  },
  {
    code: "SJ",
    label: "Svalbard and Jan Mayen",
  },
  {
    code: "SZ",
    label: "Swaziland",
  },
  {
    code: "SE",
    label: "Sweden",
  },
  {
    code: "CH",
    label: "Switzerland",
  },
  {
    code: "SY",
    label: "Syrian Arab Republic",
  },
  {
    code: "TW",
    label: "Taiwan, Province of China",
  },
  {
    code: "TJ",
    label: "Tajikistan",
  },
  {
    code: "TH",
    label: "Thailand",
  },
  {
    code: "TL",
    label: "Timor-Leste",
  },
  {
    code: "TG",
    label: "Togo",
  },
  {
    code: "TK",
    label: "Tokelau",
  },
  {
    code: "TO",
    label: "Tonga",
  },
  {
    code: "TT",
    label: "Trinidad and Tobago",
  },
  {
    code: "TN",
    label: "Tunisia",
  },
  {
    code: "TR",
    label: "Turkey",
  },
  {
    code: "TM",
    label: "Turkmenistan",
  },
  {
    code: "TC",
    label: "Turks and Caicos Islands",
  },
  {
    code: "TV",
    label: "Tuvalu",
  },
  {
    code: "VI",
    label: "US Virgin Islands",
  },
  {
    code: "UG",
    label: "Uganda",
  },
  {
    code: "UA",
    label: "Ukraine",
  },
  {
    code: "AE",
    label: "United Arab Emirates",
  },
  {
    code: "GB",
    label: "United Kingdom",
  },
  {
    code: "TZ",
    label: "United Republic of Tanzania",
  },
  {
    code: "US",
    label: "United States",
  },
  {
    code: "UY",
    label: "Uruguay",
  },
  {
    code: "UZ",
    label: "Uzbekistan",
  },
  {
    code: "VU",
    label: "Vanuatu",
  },
  {
    code: "VE",
    label: "Venezuela",
  },
  {
    code: "VN",
    label: "Vietnam",
  },
  {
    code: "WF",
    label: "Wallis and Futuna",
  },
  {
    code: "EH",
    label: "Western Sahara",
  },
  {
    code: "YE",
    label: "Yemen",
  },
  {
    code: "ZM",
    label: "Zambia",
  },
  {
    code: "ZW",
    label: "Zimbabwe",
  },
]

export default countryList
