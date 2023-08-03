let mockDataArray = [
    {
        Version: 1,
        Key: "215854",
        Type: "City",
        Rank: 31,
        LocalizedName: "Tel Aviv",
        Country: {
            ID: "IL",
            LocalizedName: "Israel",
        },
        AdministrativeArea: {
            ID: "TA",
            LocalizedName: "Tel Aviv",
        },
    },
    {
        Version: 1,
        Key: "3431644",
        Type: "City",
        Rank: 45,
        LocalizedName: "Telanaipura",
        Country: {
            ID: "ID",
            LocalizedName: "Indonesia",
        },
        AdministrativeArea: {
            ID: "JA",
            LocalizedName: "Jambi",
        },
    },
    {
        Version: 1,
        Key: "300558",
        Type: "City",
        Rank: 45,
        LocalizedName: "Telok Blangah New Town",
        Country: {
            ID: "SG",
            LocalizedName: "Singapore",
        },
        AdministrativeArea: {
            ID: "05",
            LocalizedName: "South West",
        },
    },
    {
        Version: 1,
        Key: "325876",
        Type: "City",
        Rank: 51,
        LocalizedName: "Telford",
        Country: {
            ID: "GB",
            LocalizedName: "United Kingdom",
        },
        AdministrativeArea: {
            ID: "TFW",
            LocalizedName: "Telford and Wrekin",
        },
    },
    {
        Version: 1,
        Key: "169072",
        Type: "City",
        Rank: 51,
        LocalizedName: "Telavi",
        Country: {
            ID: "GE",
            LocalizedName: "Georgia",
        },
        AdministrativeArea: {
            ID: "KA",
            LocalizedName: "Kakheti",
        },
    },
    {
        Version: 1,
        Key: "230611",
        Type: "City",
        Rank: 51,
        LocalizedName: "Telsiai",
        Country: {
            ID: "LT",
            LocalizedName: "Lithuania",
        },
        AdministrativeArea: {
            ID: "TE",
            LocalizedName: "Telšiai",
        },
    },
    {
        Version: 1,
        Key: "2723742",
        Type: "City",
        Rank: 55,
        LocalizedName: "Telégrafo",
        Country: {
            ID: "BR",
            LocalizedName: "Brazil",
        },
        AdministrativeArea: {
            ID: "PA",
            LocalizedName: "Pará",
        },
    },
    {
        Version: 1,
        Key: "186933",
        Type: "City",
        Rank: 55,
        LocalizedName: "Tela",
        Country: {
            ID: "HN",
            LocalizedName: "Honduras",
        },
        AdministrativeArea: {
            ID: "AT",
            LocalizedName: "Atlántida",
        },
    },
    {
        Version: 1,
        Key: "3453754",
        Type: "City",
        Rank: 55,
        LocalizedName: "Telaga Asih",
        Country: {
            ID: "ID",
            LocalizedName: "Indonesia",
        },
        AdministrativeArea: {
            ID: "JB",
            LocalizedName: "West Java",
        },
    },
    {
        Version: 1,
        Key: "3453755",
        Type: "City",
        Rank: 55,
        LocalizedName: "Telagamurni",
        Country: {
            ID: "ID",
            LocalizedName: "Indonesia",
        },
        AdministrativeArea: {
            ID: "JB",
            LocalizedName: "West Java",
        },
    },
];
const urlForGettingCityBasedGeo = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=ps9T93lqmdD16AcRRA6Cuq83mABQMy4O&q=31.8067218%2C35.4996216&language=en-us&toplevel=false`;
const urlForCityCode = `/locations/v1/cities/autocomplete?apikey=ps9T93lqmdD16AcRRA6Cuq83mABQMy4O&q=tel&language=en-us`;
const singleCityGetUrl = `http://dataservice.accuweather.com/currentconditions/v1/215854`;
const weeklyShortUrlFarenheight = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854`;
const weeklyShortUrlCelsius = `/forecasts/v1/daily/5day/215854?apikey=ps9T93lqmdD16AcRRA6Cuq83mABQMy4O&language=en-us&details=false&metric=true`;
const cityName = mockDataArray[0].LocalizedName;
const cityCode = mockDataArray[0].Key;
const singleCityShortMockData = [
    {
        LocalObservationDateTime: "2023-08-02T20:22:00+03:00",
        EpochTime: 1690996920,
        WeatherText: "Clear",
        WeatherIcon: 33,
        HasPrecipitation: false,
        PrecipitationType: null,
        IsDayTime: false,
        Temperature: {
            Metric: {
                Value: 30.1,
                Unit: "C",
                UnitType: 17,
            },
            Imperial: {
                Value: 86,
                Unit: "F",
                UnitType: 18,
            },
        },
        MobileLink:
            "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    },
];
const singleCityFUllMockData = [
    {
        LocalObservationDateTime: "2023-08-02T20:17:00+03:00",
        EpochTime: 1690996620,
        WeatherText: "Clear",
        WeatherIcon: 33,
        HasPrecipitation: false,
        PrecipitationType: null,
        IsDayTime: false,
        Temperature: {
            Metric: {
                Value: 30.1,
                Unit: "C",
                UnitType: 17,
            },
            Imperial: {
                Value: 86,
                Unit: "F",
                UnitType: 18,
            },
        },
        RealFeelTemperature: {
            Metric: {
                Value: 31.2,
                Unit: "C",
                UnitType: 17,
                Phrase: "Very Warm",
            },
            Imperial: {
                Value: 88,
                Unit: "F",
                UnitType: 18,
                Phrase: "Very Warm",
            },
        },
        RealFeelTemperatureShade: {
            Metric: {
                Value: 31.2,
                Unit: "C",
                UnitType: 17,
                Phrase: "Very Warm",
            },
            Imperial: {
                Value: 88,
                Unit: "F",
                UnitType: 18,
                Phrase: "Very Warm",
            },
        },
        RelativeHumidity: 59,
        IndoorRelativeHumidity: 59,
        DewPoint: {
            Metric: {
                Value: 21.4,
                Unit: "C",
                UnitType: 17,
            },
            Imperial: {
                Value: 71,
                Unit: "F",
                UnitType: 18,
            },
        },
        Wind: {
            Direction: {
                Degrees: 338,
                Localized: "NNW",
                English: "NNW",
            },
            Speed: {
                Metric: {
                    Value: 16.2,
                    Unit: "km/h",
                    UnitType: 7,
                },
                Imperial: {
                    Value: 10.1,
                    Unit: "mi/h",
                    UnitType: 9,
                },
            },
        },
        WindGust: {
            Speed: {
                Metric: {
                    Value: 25.4,
                    Unit: "km/h",
                    UnitType: 7,
                },
                Imperial: {
                    Value: 15.8,
                    Unit: "mi/h",
                    UnitType: 9,
                },
            },
        },
        UVIndex: 0,
        UVIndexText: "Low",
        Visibility: {
            Metric: {
                Value: 16.1,
                Unit: "km",
                UnitType: 6,
            },
            Imperial: {
                Value: 10,
                Unit: "mi",
                UnitType: 2,
            },
        },
        ObstructionsToVisibility: "",
        CloudCover: 0,
        Ceiling: {
            Metric: {
                Value: 7925,
                Unit: "m",
                UnitType: 5,
            },
            Imperial: {
                Value: 26000,
                Unit: "ft",
                UnitType: 0,
            },
        },
        Pressure: {
            Metric: {
                Value: 1008.8,
                Unit: "mb",
                UnitType: 14,
            },
            Imperial: {
                Value: 29.79,
                Unit: "inHg",
                UnitType: 12,
            },
        },
        PressureTendency: {
            LocalizedText: "Steady",
            Code: "S",
        },
        Past24HourTemperatureDeparture: {
            Metric: {
                Value: -0.4,
                Unit: "C",
                UnitType: 17,
            },
            Imperial: {
                Value: -1,
                Unit: "F",
                UnitType: 18,
            },
        },
        ApparentTemperature: {
            Metric: {
                Value: 32.8,
                Unit: "C",
                UnitType: 17,
            },
            Imperial: {
                Value: 91,
                Unit: "F",
                UnitType: 18,
            },
        },
        WindChillTemperature: {
            Metric: {
                Value: 30,
                Unit: "C",
                UnitType: 17,
            },
            Imperial: {
                Value: 86,
                Unit: "F",
                UnitType: 18,
            },
        },
        WetBulbTemperature: {
            Metric: {
                Value: 24.1,
                Unit: "C",
                UnitType: 17,
            },
            Imperial: {
                Value: 75,
                Unit: "F",
                UnitType: 18,
            },
        },
        Precip1hr: {
            Metric: {
                Value: 0,
                Unit: "mm",
                UnitType: 3,
            },
            Imperial: {
                Value: 0,
                Unit: "in",
                UnitType: 1,
            },
        },
        PrecipitationSummary: {
            Precipitation: {
                Metric: {
                    Value: 0,
                    Unit: "mm",
                    UnitType: 3,
                },
                Imperial: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
            },
            PastHour: {
                Metric: {
                    Value: 0,
                    Unit: "mm",
                    UnitType: 3,
                },
                Imperial: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
            },
            Past3Hours: {
                Metric: {
                    Value: 0,
                    Unit: "mm",
                    UnitType: 3,
                },
                Imperial: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
            },
            Past6Hours: {
                Metric: {
                    Value: 0,
                    Unit: "mm",
                    UnitType: 3,
                },
                Imperial: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
            },
            Past9Hours: {
                Metric: {
                    Value: 0,
                    Unit: "mm",
                    UnitType: 3,
                },
                Imperial: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
            },
            Past12Hours: {
                Metric: {
                    Value: 0,
                    Unit: "mm",
                    UnitType: 3,
                },
                Imperial: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
            },
            Past18Hours: {
                Metric: {
                    Value: 0,
                    Unit: "mm",
                    UnitType: 3,
                },
                Imperial: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
            },
            Past24Hours: {
                Metric: {
                    Value: 0,
                    Unit: "mm",
                    UnitType: 3,
                },
                Imperial: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
            },
        },
        TemperatureSummary: {
            Past6HourRange: {
                Minimum: {
                    Metric: {
                        Value: 30.1,
                        Unit: "C",
                        UnitType: 17,
                    },
                    Imperial: {
                        Value: 86,
                        Unit: "F",
                        UnitType: 18,
                    },
                },
                Maximum: {
                    Metric: {
                        Value: 34.1,
                        Unit: "C",
                        UnitType: 17,
                    },
                    Imperial: {
                        Value: 93,
                        Unit: "F",
                        UnitType: 18,
                    },
                },
            },
            Past12HourRange: {
                Minimum: {
                    Metric: {
                        Value: 27.3,
                        Unit: "C",
                        UnitType: 17,
                    },
                    Imperial: {
                        Value: 81,
                        Unit: "F",
                        UnitType: 18,
                    },
                },
                Maximum: {
                    Metric: {
                        Value: 34.2,
                        Unit: "C",
                        UnitType: 17,
                    },
                    Imperial: {
                        Value: 94,
                        Unit: "F",
                        UnitType: 18,
                    },
                },
            },
            Past24HourRange: {
                Minimum: {
                    Metric: {
                        Value: 26.3,
                        Unit: "C",
                        UnitType: 17,
                    },
                    Imperial: {
                        Value: 79,
                        Unit: "F",
                        UnitType: 18,
                    },
                },
                Maximum: {
                    Metric: {
                        Value: 34.2,
                        Unit: "C",
                        UnitType: 17,
                    },
                    Imperial: {
                        Value: 94,
                        Unit: "F",
                        UnitType: 18,
                    },
                },
            },
        },
        MobileLink:
            "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        Link: "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
    },
];

const weeklyArrayFullData = {
    Headline: {
        EffectiveDate: "2023-08-02T20:00:00+03:00",
        EffectiveEpochDate: 1690995600,
        Severity: 7,
        Text: "Warm Wednesday night",
        Category: "heat",
        EndDate: "2023-08-03T08:00:00+03:00",
        EndEpochDate: 1691038800,
        MobileLink:
            "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
        Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
    },
    DailyForecasts: [
        {
            Date: "2023-08-02T07:00:00+03:00",
            EpochDate: 1690948800,
            Sun: {
                Rise: "2023-08-02T05:56:00+03:00",
                EpochRise: 1690944960,
                Set: "2023-08-02T19:38:00+03:00",
                EpochSet: 1690994280,
            },
            Moon: {
                Rise: "2023-08-02T20:35:00+03:00",
                EpochRise: 1690997700,
                Set: "2023-08-03T07:33:00+03:00",
                EpochSet: 1691037180,
                Phase: "WaningGibbous",
                Age: 16,
            },
            Temperature: {
                Minimum: {
                    Value: 78,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 94,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            RealFeelTemperature: {
                Minimum: {
                    Value: 81,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Pleasant",
                },
                Maximum: {
                    Value: 104,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Very Hot",
                },
            },
            RealFeelTemperatureShade: {
                Minimum: {
                    Value: 81,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Pleasant",
                },
                Maximum: {
                    Value: 97,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Hot",
                },
            },
            HoursOfSun: 12.5,
            DegreeDaySummary: {
                Heating: {
                    Value: 0,
                    Unit: "F",
                    UnitType: 18,
                },
                Cooling: {
                    Value: 21,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            AirAndPollen: [
                {
                    Name: "AirQuality",
                    Value: 0,
                    Category: "Good",
                    CategoryValue: 1,
                    Type: "Ozone",
                },
                {
                    Name: "Grass",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Mold",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Ragweed",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Tree",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "UVIndex",
                    Value: 11,
                    Category: "Extreme",
                    CategoryValue: 5,
                },
            ],
            Day: {
                Icon: 1,
                IconPhrase: "Sunny",
                HasPrecipitation: false,
                ShortPhrase: "Sunny",
                LongPhrase: "Sunny",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 9.2,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 281,
                        Localized: "W",
                        English: "W",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 19.6,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 240,
                        Localized: "WSW",
                        English: "WSW",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 2,
                Evapotranspiration: {
                    Value: 0.25,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 8816.9,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false,
                ShortPhrase: "Mainly clear and warm",
                LongPhrase: "Clear to partly cloudy and warm",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 5.8,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 312,
                        Localized: "NW",
                        English: "NW",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 11.5,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 265,
                        Localized: "W",
                        English: "W",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 22,
                Evapotranspiration: {
                    Value: 0.02,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 167.1,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        },
        {
            Date: "2023-08-03T07:00:00+03:00",
            EpochDate: 1691035200,
            Sun: {
                Rise: "2023-08-03T05:57:00+03:00",
                EpochRise: 1691031420,
                Set: "2023-08-03T19:37:00+03:00",
                EpochSet: 1691080620,
            },
            Moon: {
                Rise: "2023-08-03T21:13:00+03:00",
                EpochRise: 1691086380,
                Set: "2023-08-04T08:45:00+03:00",
                EpochSet: 1691127900,
                Phase: "WaningGibbous",
                Age: 17,
            },
            Temperature: {
                Minimum: {
                    Value: 80,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 90,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            RealFeelTemperature: {
                Minimum: {
                    Value: 85,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Very Warm",
                },
                Maximum: {
                    Value: 99,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Hot",
                },
            },
            RealFeelTemperatureShade: {
                Minimum: {
                    Value: 85,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Very Warm",
                },
                Maximum: {
                    Value: 91,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Hot",
                },
            },
            HoursOfSun: 12.5,
            DegreeDaySummary: {
                Heating: {
                    Value: 0,
                    Unit: "F",
                    UnitType: 18,
                },
                Cooling: {
                    Value: 20,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            AirAndPollen: [
                {
                    Name: "AirQuality",
                    Value: 0,
                    Category: "Good",
                    CategoryValue: 1,
                    Type: "Ozone",
                },
                {
                    Name: "Grass",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Mold",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Ragweed",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Tree",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "UVIndex",
                    Value: 11,
                    Category: "Extreme",
                    CategoryValue: 5,
                },
            ],
            Day: {
                Icon: 1,
                IconPhrase: "Sunny",
                HasPrecipitation: false,
                ShortPhrase: "Sunshine",
                LongPhrase: "Sunshine",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 9.2,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 281,
                        Localized: "W",
                        English: "W",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 19.6,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 297,
                        Localized: "WNW",
                        English: "WNW",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 4,
                Evapotranspiration: {
                    Value: 0.24,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 8793.8,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false,
                ShortPhrase: "Mainly clear and very warm",
                LongPhrase: "Clear to partly cloudy and very warm",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 4.6,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 285,
                        Localized: "WNW",
                        English: "WNW",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 11.5,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 330,
                        Localized: "NNW",
                        English: "NNW",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 22,
                Evapotranspiration: {
                    Value: 0.02,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 168.8,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
        },
        {
            Date: "2023-08-04T07:00:00+03:00",
            EpochDate: 1691121600,
            Sun: {
                Rise: "2023-08-04T05:58:00+03:00",
                EpochRise: 1691117880,
                Set: "2023-08-04T19:36:00+03:00",
                EpochSet: 1691166960,
            },
            Moon: {
                Rise: "2023-08-04T21:46:00+03:00",
                EpochRise: 1691174760,
                Set: "2023-08-05T09:54:00+03:00",
                EpochSet: 1691218440,
                Phase: "WaningGibbous",
                Age: 18,
            },
            Temperature: {
                Minimum: {
                    Value: 81,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 89,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            RealFeelTemperature: {
                Minimum: {
                    Value: 86,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Very Warm",
                },
                Maximum: {
                    Value: 98,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Hot",
                },
            },
            RealFeelTemperatureShade: {
                Minimum: {
                    Value: 86,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Very Warm",
                },
                Maximum: {
                    Value: 90,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Hot",
                },
            },
            HoursOfSun: 12.1,
            DegreeDaySummary: {
                Heating: {
                    Value: 0,
                    Unit: "F",
                    UnitType: 18,
                },
                Cooling: {
                    Value: 20,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            AirAndPollen: [
                {
                    Name: "AirQuality",
                    Value: 0,
                    Category: "Good",
                    CategoryValue: 1,
                    Type: "Ozone",
                },
                {
                    Name: "Grass",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Mold",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Ragweed",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Tree",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "UVIndex",
                    Value: 11,
                    Category: "Extreme",
                    CategoryValue: 5,
                },
            ],
            Day: {
                Icon: 1,
                IconPhrase: "Sunny",
                HasPrecipitation: false,
                ShortPhrase: "Pleasant with sunshine",
                LongPhrase: "Pleasant with sunshine",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 9.2,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 266,
                        Localized: "W",
                        English: "W",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 20.7,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 279,
                        Localized: "W",
                        English: "W",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 4,
                Evapotranspiration: {
                    Value: 0.24,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 8774.8,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false,
                ShortPhrase: "Mostly clear and very warm",
                LongPhrase: "Clear to partly cloudy, very warm and humid",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 5.8,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 198,
                        Localized: "SSW",
                        English: "SSW",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 16.1,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 189,
                        Localized: "S",
                        English: "S",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 26,
                Evapotranspiration: {
                    Value: 0.02,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 147.6,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
        },
        {
            Date: "2023-08-05T07:00:00+03:00",
            EpochDate: 1691208000,
            Sun: {
                Rise: "2023-08-05T05:58:00+03:00",
                EpochRise: 1691204280,
                Set: "2023-08-05T19:35:00+03:00",
                EpochSet: 1691253300,
            },
            Moon: {
                Rise: "2023-08-05T22:17:00+03:00",
                EpochRise: 1691263020,
                Set: "2023-08-06T11:01:00+03:00",
                EpochSet: 1691308860,
                Phase: "WaningGibbous",
                Age: 19,
            },
            Temperature: {
                Minimum: {
                    Value: 80,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 89,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            RealFeelTemperature: {
                Minimum: {
                    Value: 84,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Very Warm",
                },
                Maximum: {
                    Value: 100,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Hot",
                },
            },
            RealFeelTemperatureShade: {
                Minimum: {
                    Value: 84,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Very Warm",
                },
                Maximum: {
                    Value: 93,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Hot",
                },
            },
            HoursOfSun: 11.4,
            DegreeDaySummary: {
                Heating: {
                    Value: 0,
                    Unit: "F",
                    UnitType: 18,
                },
                Cooling: {
                    Value: 19,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            AirAndPollen: [
                {
                    Name: "AirQuality",
                    Value: 0,
                    Category: "Good",
                    CategoryValue: 1,
                    Type: "Ozone",
                },
                {
                    Name: "Grass",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Mold",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Ragweed",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Tree",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "UVIndex",
                    Value: 11,
                    Category: "Extreme",
                    CategoryValue: 5,
                },
            ],
            Day: {
                Icon: 2,
                IconPhrase: "Mostly sunny",
                HasPrecipitation: false,
                ShortPhrase: "Mostly sunny and humid",
                LongPhrase: "Humid with sunshine and a few clouds",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 10.4,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 243,
                        Localized: "WSW",
                        English: "WSW",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 21.9,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 237,
                        Localized: "WSW",
                        English: "WSW",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 17,
                Evapotranspiration: {
                    Value: 0.22,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 8575.8,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Night: {
                Icon: 33,
                IconPhrase: "Clear",
                HasPrecipitation: false,
                ShortPhrase: "Clear and very warm",
                LongPhrase: "Clear and very warm",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 5.8,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 191,
                        Localized: "S",
                        English: "S",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 15,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 182,
                        Localized: "S",
                        English: "S",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 2,
                Evapotranspiration: {
                    Value: 0.02,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 165.8,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
        },
        {
            Date: "2023-08-06T07:00:00+03:00",
            EpochDate: 1691294400,
            Sun: {
                Rise: "2023-08-06T05:59:00+03:00",
                EpochRise: 1691290740,
                Set: "2023-08-06T19:34:00+03:00",
                EpochSet: 1691339640,
            },
            Moon: {
                Rise: "2023-08-06T22:48:00+03:00",
                EpochRise: 1691351280,
                Set: "2023-08-07T12:06:00+03:00",
                EpochSet: 1691399160,
                Phase: "WaningGibbous",
                Age: 20,
            },
            Temperature: {
                Minimum: {
                    Value: 79,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 90,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            RealFeelTemperature: {
                Minimum: {
                    Value: 84,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Very Warm",
                },
                Maximum: {
                    Value: 100,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Hot",
                },
            },
            RealFeelTemperatureShade: {
                Minimum: {
                    Value: 84,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Very Warm",
                },
                Maximum: {
                    Value: 92,
                    Unit: "F",
                    UnitType: 18,
                    Phrase: "Hot",
                },
            },
            HoursOfSun: 12.7,
            DegreeDaySummary: {
                Heating: {
                    Value: 0,
                    Unit: "F",
                    UnitType: 18,
                },
                Cooling: {
                    Value: 20,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            AirAndPollen: [
                {
                    Name: "AirQuality",
                    Value: 0,
                    Category: "Good",
                    CategoryValue: 1,
                    Type: "Ozone",
                },
                {
                    Name: "Grass",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Mold",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Ragweed",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "Tree",
                    Value: 0,
                    Category: "Low",
                    CategoryValue: 1,
                },
                {
                    Name: "UVIndex",
                    Value: 11,
                    Category: "Extreme",
                    CategoryValue: 5,
                },
            ],
            Day: {
                Icon: 1,
                IconPhrase: "Sunny",
                HasPrecipitation: false,
                ShortPhrase: "Sunny",
                LongPhrase: "Sunny",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 9.2,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 242,
                        Localized: "WSW",
                        English: "WSW",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 23,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 240,
                        Localized: "WSW",
                        English: "WSW",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 3,
                Evapotranspiration: {
                    Value: 0.24,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 8731.2,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false,
                ShortPhrase: "Mainly clear and very warm",
                LongPhrase: "Mainly clear and very warm",
                PrecipitationProbability: 0,
                ThunderstormProbability: 0,
                RainProbability: 0,
                SnowProbability: 0,
                IceProbability: 0,
                Wind: {
                    Speed: {
                        Value: 4.6,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 195,
                        Localized: "SSW",
                        English: "SSW",
                    },
                },
                WindGust: {
                    Speed: {
                        Value: 11.5,
                        Unit: "mi/h",
                        UnitType: 9,
                    },
                    Direction: {
                        Degrees: 262,
                        Localized: "W",
                        English: "W",
                    },
                },
                TotalLiquid: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Rain: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Snow: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                Ice: {
                    Value: 0,
                    Unit: "in",
                    UnitType: 1,
                },
                HoursOfPrecipitation: 0,
                HoursOfRain: 0,
                HoursOfSnow: 0,
                HoursOfIce: 0,
                CloudCover: 12,
                Evapotranspiration: {
                    Value: 0.02,
                    Unit: "in",
                    UnitType: 1,
                },
                SolarIrradiance: {
                    Value: 160.4,
                    Unit: "W/m²",
                    UnitType: 33,
                },
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
        },
    ],
};

export const weeklyArrayShortData = {
    Headline: {
        EffectiveDate: "2023-08-02T20:00:00+03:00",
        EffectiveEpochDate: 1690995600,
        Severity: 7,
        Text: "Warm Wednesday night",
        Category: "heat",
        EndDate: "2023-08-03T08:00:00+03:00",
        EndEpochDate: 1691038800,
        MobileLink:
            "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
        Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
    },
    DailyForecasts: [
        {
            Date: "2023-08-02T07:00:00+03:00",
            EpochDate: 1690948800,
            Temperature: {
                Minimum: {
                    Value: 78,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 94,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 1,
                IconPhrase: "Sunny",
                HasPrecipitation: false,
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false,
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
        },
        {
            Date: "2023-08-03T07:00:00+03:00",
            EpochDate: 1691035200,
            Temperature: {
                Minimum: {
                    Value: 80,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 90,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 1,
                IconPhrase: "Sunny",
                HasPrecipitation: false,
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false,
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
        },
        {
            Date: "2023-08-04T07:00:00+03:00",
            EpochDate: 1691121600,
            Temperature: {
                Minimum: {
                    Value: 81,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 89,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 1,
                IconPhrase: "Sunny",
                HasPrecipitation: false,
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false,
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
        },
        {
            Date: "2023-08-05T07:00:00+03:00",
            EpochDate: 1691208000,
            Temperature: {
                Minimum: {
                    Value: 80,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 89,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 2,
                IconPhrase: "Mostly sunny",
                HasPrecipitation: false,
            },
            Night: {
                Icon: 33,
                IconPhrase: "Clear",
                HasPrecipitation: false,
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
        },
        {
            Date: "2023-08-06T07:00:00+03:00",
            EpochDate: 1691294400,
            Temperature: {
                Minimum: {
                    Value: 79,
                    Unit: "F",
                    UnitType: 18,
                },
                Maximum: {
                    Value: 90,
                    Unit: "F",
                    UnitType: 18,
                },
            },
            Day: {
                Icon: 1,
                IconPhrase: "Sunny",
                HasPrecipitation: false,
            },
            Night: {
                Icon: 34,
                IconPhrase: "Mostly clear",
                HasPrecipitation: false,
            },
            Sources: ["AccuWeather"],
            MobileLink:
                "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
            Link: "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
        },
    ],
};

const singleCityFromGeo = {
    Version: 1,
    Key: "261357",
    Type: "City",
    Rank: 65,
    LocalizedName: "Jericho",
    EnglishName: "Jericho",
    PrimaryPostalCode: "",
    Region: {
        ID: "MEA",
        LocalizedName: "Middle East",
        EnglishName: "Middle East",
    },
    Country: {
        ID: "PS",
        LocalizedName: "Palestine",
        EnglishName: "Palestine",
    },
    AdministrativeArea: {
        ID: "WE",
        LocalizedName: "West Bank",
        EnglishName: "West Bank",
        Level: 1,
        LocalizedType: "Territory",
        EnglishType: "Territory",
        CountryID: "PS",
    },
    TimeZone: {
        Code: "EEST",
        Name: "Asia/Hebron",
        GmtOffset: 3,
        IsDaylightSaving: true,
        NextOffsetChange: "2023-10-27T23:00:00Z",
    },
    GeoPosition: {
        Latitude: 31.859,
        Longitude: 35.459,
        Elevation: {
            Metric: {
                Value: -242,
                Unit: "m",
                UnitType: 5,
            },
            Imperial: {
                Value: -793,
                Unit: "ft",
                UnitType: 0,
            },
        },
    },
    IsAlias: false,
    SupplementalAdminAreas: [
        {
            Level: 2,
            LocalizedName: "Jericho",
            EnglishName: "Jericho",
        },
    ],
    DataSets: [
        "AirQualityCurrentConditions",
        "AirQualityForecasts",
        "DailyPollenForecast",
        "ForecastConfidence",
        "FutureRadar",
        "MinuteCast",
    ],
};