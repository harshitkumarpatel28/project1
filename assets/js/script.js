/* Default or Global vars */
let polygonList = [];
let latitude = 0;
let longitude = 0;
let east = 0;
let west = 0;
let north = 0;
let south = 0;
let capital = "";
let markers = L.markerClusterGroup({
    polygonOptions: {
        fillColor: "#fff",
        color: "orange",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5
    }
});
let cityMarkers = L.markerClusterGroup({
    polygonOptions: {
        fillColor: "#fff",
        color: "cyan",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5
    }
});
let earthquakeMarkers = L.markerClusterGroup({
    polygonOptions: {
        fillColor: "#fff",
        color: "red",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5
    }
});
let userMarker = L.marker();

let airportsData = [];
let tempCountryCode = '';
let airportIcon = L.ExtraMarkers.icon({
    prefix: "fa",
    icon: "fa-plane",
    //iconColor: "black",
    markerColor: "orange",
    shape: "square"
});
let airportFlag = false;

let citiesData = [];
let cityIcon = L.ExtraMarkers.icon({
    prefix: "fa",
    icon: "fa-city",
    markerColor: "violet",
    shape: "square"
});

let earthquakeData = [];
let earthquakeIcon = L.ExtraMarkers.icon({
    prefix: "fa",
    icon: "fa-archive",
    markerColor: "red",
    shape: "square"
});

let userFlag = false;

let countryCurrency;
let countryCodes = {
    "AED": "UAE Dirham",
    "AFN": "Afghan Afghani",
    "ALL": "Albanian Lek",
    "AMD": "Armenian Dram",
    "ANG": "Netherlands Antillian Guilder",
    "AOA": "Angolan Kwanza",
    "ARS": "Argentine Peso",
    "AUD": "Australian Dollar",
    "AWG": "Aruban Florin",
    "AZN": "Azerbaijani Manat",
    "BAM": "Bosnia and Herzegovina Convertible Mark",
    "BBD": "Barbados Dollar",
    "BDT": "Bangladeshi Taka",
    "BGN": "Bulgarian Lev",
    "BHD": "Bahraini Dinar",
    "BIF": "Burundian Franc",
    "BMD": "Bermudian Dollar",
    "BND": "Brunei Dollar",
    "BOB": "Bolivian Boliviano",
    "BRL": "Brazilian Real",
    "BSD": "Bahamian Dollar",
    "BTN": "Bhutanese Ngultrum",
    "BWP": "Botswana Pula",
    "BYN": "Belarusian Ruble",
    "BZD": "Belize Dollar",
    "CAD": "Canadian Dollar",
    "CDF": "Congolese Franc",
    "CHF": "Swiss Franc",
    "CLP": "Chilean Peso",
    "CNY": "Chinese Renminbi",
    "COP": "Colombian Peso",
    "CRC": "Costa Rican Colon",
    "CUP": "Cuban Peso",
    "CVE": "Cape Verdean Escudo",
    "CZK": "Czech Koruna",
    "DJF": "Djiboutian Franc",
    "DKK": "Danish Krone",
    "DOP": "Dominican Peso",
    "DZD": "Algerian Dinar",
    "EGP": "Egyptian Pound",
    "ERN": "Eritrean Nakfa",
    "ETB": "Ethiopian Birr",
    "EUR": "Euro",
    "FJD": "Fiji Dollar",
    "FKP": "Falkland Islands Pound",
    "FOK": "Faroese Króna",
    "GBP": "Pound Sterling",
    "GEL": "Georgian Lari",
    "GGP": "Guernsey Pound",
    "GHS": "Ghanaian Cedi",
    "GIP": "Gibraltar Pound",
    "GMD": "Gambian Dalasi",
    "GNF": "Guinean Franc",
    "GTQ": "Guatemalan Quetzal",
    "GYD": "Guyanese Dollar",
    "HKD": "Hong Kong Dollar",
    "HNL": "Honduran Lempira",
    "HRK": "Croatian Kuna",
    "HTG": "Haitian Gourde",
    "HUF": "Hungarian Forint",
    "IDR": "Indonesian Rupiah",
    "ILS": "Israeli New Shekel",
    "IMP": "Manx Pound",
    "INR": "Indian Rupee",
    "IQD": "Iraqi Dinar",
    "IRR": "Iranian Rial",
    "ISK": "Icelandic Kr&Oacutena",
    "JEP": "Jersey Pound",
    "JMD": "Jamaican Dollar",
    "JOD": "Jordanian Dinar",
    "JPY": "Japanese Yen",
    "KES": "Kenyan Shilling",
    "KGS": "Kyrgyzstani Som",
    "KHR": "Cambodian Riel",
    "KID": "Kiribati Dollar",
    "KMF": "Comorian Franc",
    "KRW": "South Korean Won",
    "KWD": "Kuwaiti Dinar",
    "KYD": "Cayman Islands Dollar",
    "KZT": "Kazakhstani Tenge",
    "LAK": "Lao Kip",
    "LBP": "Lebanese Pound",
    "LKR": "Sri Lanka Rupee",
    "LRD": "Liberian Dollar",
    "LSL": "Lesotho Loti",
    "LYD": "Libyan Dinar",
    "MAD": "Moroccan Dirham",
    "MDL": "Moldovan Leu",
    "MGA": "Malagasy Ariary",
    "MKD": "Macedonian Denar",
    "MMK": "Burmese Kyat",
    "MNT": "Mongolian Tögrög",
    "MOP": "Macanese Pataca",
    "MRU": "Mauritanian Ouguiya",
    "MUR": "Mauritian Rupee",
    "MVR": "Maldivian Rufiyaa",
    "MWK": "Malawian Kwacha",
    "MXN": "Mexican Peso",
    "MYR": "Malaysian Ringgit",
    "MZN": "Mozambican Metical",
    "NAD": "Namibian Dollar",
    "NGN": "Nigerian Naira",
    "NIO": "Nicaraguan Córdoba",
    "NOK": "Norwegian Krone",
    "NPR": "Nepalese Rupee",
    "NZD": "New Zealand Dollar",
    "OMR": "Omani Rial",
    "PAB": "Panamanian Balboa",
    "PEN": "Peruvian Sol",
    "PGK": "Papua New Guinean Kina",
    "PHP": "Philippine Peso",
    "PKR": "Pakistani Rupee",
    "PLN": "Polish Złoty",
    "PYG": "Paraguayan Guaraní",
    "QAR": "Qatari Riyal",
    "RON": "Romanian Leu",
    "RSD": "Serbian Dinar",
    "RUB": "Russian Ruble",
    "RWF": "Rwandan Franc",
    "SAR": "Saudi Riyal",
    "SBD": "Solomon Islands Dollar",
    "SCR": "Seychellois Rupee",
    "SDG": "Sudanese Pound",
    "SEK": "Swedish Krona",
    "SGD": "Singapore Dollar",
    "SHP": "Saint Helena Pound",
    "SLE": "Sierra Leonean Leone",
    "SLL": "Sierra Leonean Leone",
    "SOS": "Somali Shilling",
    "SRD": "Surinamese Dollar",
    "SSP": "South Sudanese Pound",
    "STN": "São Tomé and Príncipe Dobra",
    "SYP": "Syrian Pound",
    "SZL": "Eswatini Lilangeni",
    "THB": "Thai Baht",
    "TJS": "Tajikistani Somoni",
    "TMT": "Turkmenistan Manat",
    "TND": "Tunisian Dinar",
    "TOP": "Tongan Pa'anga",
    "TRY": "Turkish Lira",
    "TTD": "Trinidad and Tobago Dollar",
    "TVD": "Tuvaluan Dollar",
    "TWD": "New Taiwan Dollar",
    "TZS": "Tanzanian Shilling",
    "UAH": "Ukrainian Hryvnia",
    "UGX": "Ugandan Shilling",
    "USD": "United States Dollar",
    "UYU": "Uruguayan Peso",
    "UZS": "Uzbekistani So'm",
    "VES": "Venezuelan Bolílet Soberano",
    "VND": "Vietnamese Đồng",
    "VUV": "Vanuatu Vatu",
    "WST": "Samoan Tālā",
    "XAF": "Central African CFA Franc",
    "XCD": "East Caribbean Dollar",
    "XDR": "Special Drawing Rights",
    "XOF": "West African CFA franc",
    "XPF": "CFP Franc",
    "YER": "Yemeni Rial",
    "ZAR": "South African Rand",
    "ZMW": "Zambian Kwacha",
    "ZWL": "Zimbabwean Dollar"
};

const toastBootstrap = bootstrap.Toast.getOrCreateInstance($('#toast'));

const compare = (a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

$(window).on('load', function () {

    /* get user location by getting permission during on load starts */
    navigator.geolocation.getCurrentPosition(successLocation, ErrorLocation);
    /* get user location by getting permission during on load starts */

    /* get country list starts */
    $.ajax({
        url: "php/getCountryList.php",
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            if (result.status.code === 200) {
                if (result.data === null || 'status' in result.data) {
                    toast('Error', 'Country List data not available');
                    loader(false);
                } else {
                    $('.result').empty();
                    let option = "<option value=''>-- Select Country --</option>";
                    if ((result.data.countries).length > 0) {
                        (result.data.countries).sort(compare).forEach(ele => {
                            option += `<option value=${ele.countryCode}>${ele.name}</option>`;
                        });
                    }
                    $('.country-dropdown').empty();
                    $('.country-dropdown').append(option);
                }
            }

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
    /* get country list ends */
});

/* success for location starts */
function successLocation(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getUserLocation(position.coords.latitude, position.coords.longitude)
    //loader(true)
}
/* success for location ends */

/* Error for location starts */
function ErrorLocation() {
    loader(false);
}
/* Error for location ends */

$(document).ready(function () {
    let streets = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012"
    }
    );

    let satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
    );

    let basemaps = {
        "Streets": streets,
        "Satellite": satellite
    };

    let airportLayer = L.layerGroup([markers]);
    let cityLayer = L.layerGroup([cityMarkers]);
    let earthquakeLayer = L.layerGroup([earthquakeMarkers]);

    let overlayMaps = {
        "Airports": airportLayer,
        "Cities": cityLayer,
        "Earthquake": earthquakeLayer
    };

    map = L.map("map", {
        layers: [streets]
    });

    layerControl = L.control.layers(basemaps, overlayMaps).addTo(map);

    // country information
    L.easyButton('fas fa-info fs-5 text-info position-absolute top-50 start-50 translate-middle', function (e) {
        map.invalidateSize()
        $('#countryInformationModal').modal('show');
    }, 'Country Information').addTo(map);

    // news
    L.easyButton('fas fa-newspaper fs-6 text-primary position-absolute top-50 start-50 translate-middle', function (e) {
        map.invalidateSize()
        $('#newsModal').modal('show');
    }, 'News').addTo(map);

    // weather
    L.easyButton('fas fa-cloud-sun fs-6 text-black position-absolute top-50 start-50 translate-middle', function (e) {
        map.invalidateSize()
        $('#weatherModal').modal('show');
    }, 'Weather Information').addTo(map);

    // wiki links
    L.easyButton('fab fa-wikipedia-w fs-6 text-success position-absolute top-50 start-50 translate-middle', function (e) {
        map.invalidateSize()
        $('#wikiLinksModal').modal('show');
    }, 'Wikipedia Links').addTo(map);

    // currency convertor
    L.easyButton('fas fa-pound-sign fs-6 text-danger position-absolute top-50 start-50 translate-middle', function (e) {
        map.invalidateSize()
        $('#currencyModal').modal('show');
    }, 'Currency Exchange Rate').addTo(map);

    /* select country on change starts */
    $('.country-dropdown').on('change', function () {

        if ($(this).val().toString() !== "") {
            loader(true);
            getCountryBoundaries($(this).val().toString());
        }
    });
    /* select country on change ends */

    L.Map.addInitHook(function () {
        return L.DomEvent.off(this._container, "mousedown", this.keyboard._onMouseDown);
    });

    $(window).on('scroll', function () {
        $(this).scrollTop(0);
    });

    /* currency exchange on change starts */
    $('#exchangeCurrency').on('change', function () {
        currencyExchangeValue();
    });

    $('#baseValue').on('keyup change', function () {
        currencyExchangeValue();
    });
    /* currency exchange on change ends */
    
    /* country & currency block hide be default starts */
    $('.yes-country-info').hide();
    $('.no-country-info').show();
    $('.yes-weather').hide();
    $('.no-weather').show();
    $('.yes-currency').hide();
    $('.no-currency').show();
    /* country & currency block hide be default ends */
    
});

/* loader starts */
function loader(isOnOff) {
    if (isOnOff === true) {
        $('#preloader').show();
    } else {

        if ($('#preloader').length) {
            $('#preloader').delay(1000).fadeOut('slow', function () {
                $(this).hide();
            });
        }
    }
}
/* loader ends */

/* toast starts */
function toast(title = '', message = '') {
    $('.toast .toast-title').text(title);
    $('.toast .toast-body').text(message);
    toastBootstrap.show();
}
/* toast ends */

/* get user location starts */
function getUserLocation(lat, lng) {

    $.ajax({
        url: "php/getUserLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            lat: lat,
            lng: lng
        },
        success: function (result) {
            if (result.status.code === 200) {
                if (result.data === null || 'status' in result.data) {
                    toast('Error', 'Unable to find location');
                } else {
                    $('.country-dropdown').val(result.data.countryCode).change()
                }
            } else {
                toast('Error', 'Unable to find location');
                loader(false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* get user location ends */

/* get country boundaries starts */
function getCountryBoundaries(countryCode) {

    $.ajax({
        url: "php/getCountryBoundaries.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode
        },
        success: function (result) {
            if (result.status.code === 200) {
                if (polygonList.length !== 0) {
                    polygonList.forEach(pEle => {
                        pEle.remove();
                    })
                }

                if (result.data.length !== 0) {
                    let boundaryList = [];
                    result.data.coordinates.forEach(ele => {
                        let boundaries = [];
                        ele.forEach(cEle => {
                            boundaries.push([cEle[1], cEle[0]]);
                            boundaryList.push([cEle[1], cEle[0]]);
                        })
                        plotBoundaries(boundaries);
                    });
                    // zoom the map to the polygon
                    map.fitBounds(boundaryList);
                } else {
                    toast('Error', 'Unable to find country boundaries');
                }

                getCountryInfo(countryCode);
                getAirports(countryCode);
                getCities(countryCode);

                loader(false);

                if ($('.leaflet-control-layers-overlays > label > div > input:checked').length === 0) {
                    $(".leaflet-control-layers-overlays > label > div > input").click();
                }

            } else {
                toast('Error', 'Country Boundaries not available');
                loader(false);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* get country boundaries ends */

/* plot the boundaries of a country on map starts */
function plotBoundaries(boundaries) {

    let latlngs = [boundaries];
    if (boundaries.length > 0) {
        const polygon = L.polygon(latlngs, { color: '#6c757d' }).addTo(map);
        polygonList.push(polygon);
    }

}
/* plot the boundaries of a country on map ends */

/* information about country starts */
function getCountryInfo(countryCode) {

    $.ajax({
        url: "php/getCountryInfo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode
        },
        success: function (result) {
            if (result.status.code === 200) {
                if (result.data.geonames.length !== 0) {
                    let countriesCurrency;
                    result.data.geonames.forEach(ele => {
                        countriesCurrency = ele.currencyCode;
                        $('.country-name').text(ele.countryName);
                        $('.country-capital').text(ele.capital);
                        $('.country-area').text(Number(ele.areaInSqKm).toLocaleString('en-UK'));
                        $('.country-area').append($.parseHTML(' km<sup>2</sup>'));
                        $('.country-population').text(Number(ele.population).toLocaleString('en-UK'));
                        $('.country-code').text(ele.countryCode);
                        $('.country-currency').text(ele.currencyCode);
                        east = String(ele.east).substring(0, 5);
                        west = String(ele.west).substring(0, 5);
                        north = String(ele.north).substring(0, 5);
                        south = String(ele.south).substring(0, 5);
                        capital = ele.capital;
                    });
                    getCurrencyExchange(countriesCurrency);
                    getWikiLinks(north, south, east, west, countryCode);
                    getEarthquakeDetails(east, west, north, south);
                    getWeatherInfo(capital);
                    getNews(countryCode);
                    $('.yes-country-info').show();
                    $('.no-country-info').hide();
                } else {
                    $('.yes-country-info').hide();
                    $('.no-country-info').show();
                    toast('Error', 'Country information not available');
                }
            } else {
                $('.yes-country-info').hide();
                $('.no-country-info').show();
                toast('Error', 'Unable to find country information');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.yes-country-info').hide();
            $('.no-country-info').show();
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* information about country ends */

/* news starts */
function getNews(countryCode) {

    $.ajax({
        url: "php/getNews.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode
        },
        success: function (result) {
            if (result.status.code === 200) {
                if (result.data.status === 'success' && result.data.results.length !== 0) {
                    let title = "";
                    $('#newsModal .modal-body').empty();
                    result.data.results.forEach(function (nEle, index) {
                        if ((title === "") || (title !== "" && title !== nEle.title)) {
                            title = nEle.title;
                            let hr = "";
                            if(index > 0) {
                                hr = "<hr>";
                            }
                            let table = '<table class="table table-borderless">';
                            table += '<tbody>';
                            table += '<tr>';
                            table += '<td rowspan="2" class="w-50">';
                            if (nEle.image_url === null) {
                                table += '<img src="assets/images/dummy.jpg" class="rounded img-fluid news-image"/></div>';
                            } else {
                                // check image is valid or not
                                table += '<img src=' + nEle.image_url + ' class="rounded news-image img-thumbnail"/></div>';
                            }

                            table += '</td>';

                            table += '<td><a class="link-offset-2 link-underline link-opacity-50-hover text-break link-underline-opacity-50-hover" target="_blank" href="' +
                             nEle.link + '" alt="Read more">'+ (nEle.title !== undefined ? nEle.title : '').substr(0, 50) +'</a></td>';
                            table += '<tr><td class="align-bottom pb-0"><p class="fw-light">'+nEle.source_name+'</p></td></tr>';

                            $('#newsModal .modal-body').append(hr+table);
                            getNewsImageCheck();
                            $('.no-news').hide();
                        }
                    });

                } else {
                    $('#newsModal .modal-body').empty();
                    $('.no-news').hide();
                    toast('Error', 'News not available');
                }
            } else {
                $('#newsModal .modal-body').empty();
                $('.no-news').hide();
                toast('Error', 'Unable to find News');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#newsModal .modal-body').empty();
            $('.no-news').hide();
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* information about country ends */

/* check whether news image is broken or not starts */
function getNewsImageCheck() {
    $('.news-image').on('error', function () {
        $(this).attr('src', 'assets/images/dummy.jpg');
    });
}
/* check whether news image is broken or not ends */

/* earthquake details starts */
function getEarthquakeDetails(east, west, north, south) {

    $.ajax({
        url: "php/getEarthquakeDetails.php",
        type: 'POST',
        dataType: 'json',
        data: {
            east: east,
            west: west,
            north: north,
            south: south
        },
        success: function (result) {
            if (earthquakeData.length !== 0) {
                earthquakeMarkers.eachLayer(layer => {
                    earthquakeMarkers.removeLayer(layer);
                });
                earthquakeData = [];
            }

            if (result.status.code === 200) {
                let tr = "";
                if (result.data.earthquakes.length !== 0) {
                    result.data.earthquakes.forEach(ele => {
                        let earthquakeMarker = L.marker(new L.LatLng(ele.lat, ele.lng), { icon: earthquakeIcon }, { title: 'Earthquake' });
                        let listGroup = '<ul class="list-group">' +
                            '<li class="list-group-item active" aria-current="true"><strong>Natural Disaster: </strong> Earthquake</li>' +
                            '<li class="list-group-item"><strong>On: </strong> ' + (Date.parse(ele.datetime).toString("MMMM dS yyyy, hh:mm tt")) + '</li>' +
                            '<li class="list-group-item"><strong>Magnitude:</strong> ' + ele.magnitude + '</li>' +
                            '<li class="list-group-item"><strong>Depth:</strong> ' + ele.depth + '</li>' +
                            '</ul>';

                        earthquakeMarker.bindPopup(listGroup);
                        earthquakeData.push(earthquakeMarker);
                    });
                    earthquakeMarkers.addLayers(earthquakeData);
                } else {
                    toast('Error', 'Earthquake data not available');
                }
            } else {
                toast('Error', 'Unable to find earthquake information');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* earthquake details ends */

/* get airports plotting starts */
function getAirports(countryCode) {

    $.ajax({
        url: "php/getCountryAirports.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode
        },
        success: function (result) {
            if (airportsData.length !== 0) {
                markers.eachLayer(layer => {
                    markers.removeLayer(layer);
                });
                airportsData = [];
            }

            if (result.status.code === 200) {
                if (result.data.geonames.length !== 0) {
                    result.data.geonames.forEach(ele => {
                        if ((ele.toponymName).search("Airport") !== -1 && ele.countryCode === countryCode) {
                            let marker = L.marker(new L.LatLng(ele.lat, ele.lng), { icon: airportIcon }, { title: ele.toponymName });
                            marker.bindPopup(ele.toponymName);
                            airportsData.push(marker);
                        }
                    });
                    markers.addLayers(airportsData);
                } else {
                    toast('Error', 'Airports data not available');
                }
            } else {
                toast('Error', 'Unable to find airports');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* get airports plotting ends */

/* get cities plotting starts */
function getCities(countryCode) {

    $.ajax({
        url: "php/getCities.php",
        type: 'POST',
        dataType: 'json',
        data: {
            countryCode: countryCode
        },
        success: function (result) {
            if (citiesData.length !== 0) {
                cityMarkers.eachLayer(layer => {
                    cityMarkers.removeLayer(layer);
                });
                citiesData = [];
            }

            if (result.status.code === 200) {
                if (result.data.geonames.length !== 0) {
                    result.data.geonames.forEach(ele => {
                        if (ele.fcl === "P" && ele.countryCode === countryCode) {
                            let citiesMarker = L.marker(new L.LatLng(ele.lat, ele.lng), { icon: cityIcon }, { title: ele.name });
                            citiesMarker.bindPopup(ele.toponymName);
                            citiesData.push(citiesMarker);
                        }
                    });
                    cityMarkers.addLayers(citiesData);
                } else {
                    toast('Error', 'Cities data not available');
                }
            } else {
                toast('Error', 'Unable to find cities');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* get cities plotting ends */

/* weather information starts */
function getWeatherInfo(capital) {

    $.ajax({
        url: "php/getWeather.php",
        type: 'POST',
        dataType: 'json',
        data: {
            placeName: capital
        },
        success: function (result) {
            if (result.status.code === 200) {
                if (result.data !== null) {
                    result.data.forecast.forecastday.forEach((weatherEle, index) => {
                        if (index === 0) {
                            $('.current-date-text').text(weatherEle.day.condition.text);
                            let imgCurrent = "<img src='" + weatherEle.day.condition.icon + "' />";
                            $('.current-weather-image').empty().append($.parseHTML(imgCurrent));
                            $('.current-max-temp').text(Math.round(weatherEle.day.maxtemp_c));
                            $('.current-min-temp').text(Math.round(weatherEle.day.mintemp_c));
                        }

                        if (index === 1) {
                            $('.forecast-date-tomorrow').text(Date.parse(weatherEle.date).toString("MMM dS"));
                            let imgCurrent = "<img src='" + weatherEle.day.condition.icon + "' />";
                            $('.tomorrow-date-image').empty().append($.parseHTML(imgCurrent));
                            $('.tomorrow-max-temp').text(Math.round(weatherEle.day.maxtemp_c));
                            $('.tomorrow-min-temp').text(Math.round(weatherEle.day.mintemp_c));
                        }

                        if (index === 2) {
                            $('.forecast-date-day-after-tomorrow').text(Date.parse(weatherEle.date).toString("MMM dS"));
                            let imgCurrent = "<img src='" + weatherEle.day.condition.icon + "' />";
                            $('.day-after-tomorrow-date-image').empty().append($.parseHTML(imgCurrent));
                            $('.day-after-tomorrow-max-temp').text(Math.round(weatherEle.day.maxtemp_c));
                            $('.day-after-tomorrow-min-temp').text(Math.round(weatherEle.day.mintemp_c));
                        }
                    });
                    $('.yes-weather').show();
                    $('.no-weather').hide();
                } else {
                    $('.yes-weather').hide();
                    $('.no-weather').show();
                    toast('Error', 'Weather information not available');
                }
            } else {
                $('.yes-weather').hide();
                $('.no-weather').show();
                toast('Error', 'Unable to get weather information');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.yes-weather').hide();
            $('.no-weather').show();
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* weather information ends */

/* wiki Links about country starts */
function getWikiLinks(north, south, east, west, countryCode) {

    $.ajax({
        url: "php/getWikiLinks.php",
        type: 'POST',
        dataType: 'json',
        data: {
            north: north,
            south: south,
            east: east,
            west: west
        },
        success: function (result) {
            if (result.status.code === 200) {
                $('#wikiLinksModal .modal-body').empty();
                if (result.data.geonames.length !== 0) {
                    let div = "";
                    result.data.geonames.forEach((ele, index) => {
                        if (countryCode === ele.countryCode && ele.feature !== "country") {

                            div += '<div class="card mb-3">' +
                                '<div class="card-header">' + ele.title + '</div>' +
                                '<div class="card-body"> <p class="card-text">' + (ele.summary !== undefined ? ele.summary : '').substr(0, 100) +
                                ' <a class="link-offset-2 link-underline link-underline-opacity-0 link-opacity-50-hover" target="_blank" href="https://' + ele.wikipediaUrl + '" alt="Read more">Read more</a></p>' +
                                '</div>' +
                                '</div>';
                        }

                    });
                    $('#wikiLinksModal .modal-body').append(div);
                    $('.no-wiki').hide();
                } else {
                    $('#wikiLinksModal .modal-body').empty();
                    $('.no-wiki').show();
                    toast('Error', 'Wikipedia data not available');
                }
            } else {
                $('#wikiLinksModal .modal-body').empty();
                $('.no-wiki').show();
                toast('Error', 'Unable to get wikipedia data');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#wikiLinksModal .modal-body').empty();
            $('.no-wiki').show();
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* wiki Links about country ends */

/* set User position starts */
function setUserPosition() {

    navigator.geolocation.getCurrentPosition(successLocation, ErrorLocation);

    if (latitude !== 0 && longitude !== 0) {
        userMarker.remove();
        if (userFlag === true) {
            userFlag = false;
        } else {
            userFlag = true;
            airportFlag = false;
            markers.remove();
            getUserLocation(latitude, longitude);
            userMarker.setLatLng([latitude, longitude])
                .bindPopup('<p>Your location.</p>')
                .addTo(map).openPopup();
        }
    }
}
/* set User position ends */

/* get currency exchange rates starts */
function getCurrencyExchange(countryCurrency) {

    $.ajax({
        url: "php/getCurrencyExchange.php",
        type: 'POST',
        dataType: 'json',
        data: {
            currency: countryCurrency
        },
        success: function (result) {
            if (result.status.code === 200) {
                if (result.data.conversion_rates.length !== 0) {
                    let options = "";
                    const currencyArr = Object.entries(result.data.conversion_rates);
                    currencyArr.forEach((ele) => {
                        if (ele[0] === countryCurrency) {
                            $('.baseValue').text(`From ${countryCodes[ele[0]]}`);
                        } else {
                            options += `<option value=${ele[1].toFixed(2)}>${countryCodes[ele[0]]}</option>`;
                        }
                    });
                    $("#exchangeCurrency").empty().append(options);
                    currencyExchangeValue();
                    $('.yes-currency').show();
                    $('.no-currency').hide();
                } else {
                    $('.yes-currency').hide();
                    $('.no-currency').show();
                    toast('Error', 'Currency Exchange data not available');
                }
            } else {
                $('.yes-currency').hide();
                $('.no-currency').show();
                toast('Error', 'Unable to get currency exchange data');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('.yes-currency').hide();
            $('.no-currency').show();
            console.log('textStatus', textStatus);
            console.log('errorThrown', errorThrown);
            toast('Error', 'Internal Server Error');
            loader(false);
        }
    });
}
/* get currency exchange rates ends */

/* currency exchange on select starts */
function currencyExchangeValue() {
    if ($('#baseValue').val() !== "") {
        let baseValue = Number($('#baseValue').val());
        let exchangeValue = (baseValue * Number($('#exchangeCurrency').val())).toFixed(2);
        $('#exchangeValue').val(exchangeValue);
    } else {
        $('#exchangeValue').val(0);
    }

}
/* currency exchange on select ends */