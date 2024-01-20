import React, { useState, useEffect } from 'react';
import './criptomonedas.json';
import './styles/CryptoConverterApp.css';

const CryptoConverterApp = () => {
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [cryptoData, setCryptoData] = useState([]);
    const [usdValue, setUsdValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [percentageChange, setPercentageChange] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');
    const [currencyValue, setCurrencyValue] = useState('');
    const [revertedValue, setRevertedValue] = useState('');


    function simulateApiResponse(moneda1, moneda2) {
        return {
            ok: true, // Indica que la solicitud fue exitosa
            json: async () => [
                {
                    "id": "bitcoin",
                    "symbol": "btc",
                    "name": "Bitcoin",
                    // ... (otros campos)
                },
                {
                    "id": "ethereum",
                    "symbol": "eth",
                    "name": "Ethereum",
                    // ... (otros campos)
                },
                // Puedes agregar más monedas según sea necesario
            ],
        };
    }

    useEffect(() => {
        // Lógica para cargar la lista de criptomonedas desde la API
        const fetchCryptoList = async () => {
            try {
                const moneda1 = 'bitcoin'; // Cambia 'bitcoin' por la primera moneda que desees
                const moneda2 = 'ethereum'; // Cambia 'ethereum' por la segunda moneda que desees



                //const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${moneda1},${moneda2}&order=market_cap_desc&per_page=2&page=1&sparkline=false&localization=false&tickers=false&community_data=false&developer_data=false`);
                const response = await simulateApiResponse(moneda1, moneda2);
                console.log("Response: ", response);

                if (response.ok) {
                    //const data = await response.json();
                    const data = [
                        {
                            "id": "bitcoin",
                            "symbol": "btc",
                            "name": "Bitcoin",
                            "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
                            "current_price": 46302,
                            "market_cap": 909202323430,
                            "market_cap_rank": 1,
                            "fully_diluted_valuation": 974402021921,
                            "total_volume": 30065915379,
                            "high_24h": 47680,
                            "low_24h": 44591,
                            "price_change_24h": -440.3726119071798,
                            "price_change_percentage_24h": -0.94212,
                            "market_cap_change_24h": -5261994157.335815,
                            "market_cap_change_percentage_24h": -0.57542,
                            "circulating_supply": 19594837.0,
                            "total_supply": 21000000.0,
                            "max_supply": 21000000.0,
                            "ath": 69045,
                            "ath_change_percentage": -32.82273,
                            "ath_date": "2021-11-10T14:24:11.849Z",
                            "atl": 67.81,
                            "atl_change_percentage": 68301.52478,
                            "atl_date": "2013-07-06T00:00:00.000Z",
                            "roi": "null",
                            "last_updated": "2024-01-10T19:28:16.129Z"
                        },
                        {
                            "id": "usd-coin",
                            "symbol": "usdc",
                            "name": "USDC",
                            "image": "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
                            "current_price": 0.998641,
                            "market_cap": 25188613599,
                            "market_cap_rank": 7,
                            "fully_diluted_valuation": 25208193374,
                            "total_volume": 20408241076,
                            "high_24h": 1.01,
                            "low_24h": 0.979243,
                            "price_change_24h": -0.001745018724486847,
                            "price_change_percentage_24h": -0.17443,
                            "market_cap_change_24h": -93579832.03005219,
                            "market_cap_change_percentage_24h": -0.37014,
                            "circulating_supply": 25202243677.1047,
                            "total_supply": 25221834046.6947,
                            "max_supply": "null",
                            "ath": 1.17,
                            "ath_change_percentage": -14.67823,
                            "ath_date": "2019-05-08T00:40:28.300Z",
                            "atl": 0.877647,
                            "atl_change_percentage": 14.00644,
                            "atl_date": "2023-03-11T08:02:13.981Z",
                            "roi": "null",
                            "last_updated": "2024-01-10T19:28:27.495Z"
                        }
                    ]
                    console.log("Datos de la API:", data);

                    setCryptoData(data);
                    // Asignar las criptomonedas predeterminadas si es necesario
                    setFromCurrency(data[0]?.id || '');
                    setToCurrency(data[1]?.id || '');
                } else {
                    console.error(`Error en la solicitud HTTP. Código de estado: ${response.status}`);
                }
            } catch (error) {
                console.error(`Error en la solicitud HTTP: ${error}`);
            }
        };

        fetchCryptoList();
    }, []);

    const convertCryptos = (fromCurrency, toCurrency) => {
        // Lógica para realizar la conversión de criptomonedas
        const selectedCryptoFrom = cryptoData.find((crypto) => crypto.id === fromCurrency);
        const selectedCryptoTo = cryptoData.find((crypto) => crypto.id === toCurrency);

        if (selectedCryptoFrom && selectedCryptoTo) {
            const valueInToCurrency = selectedCryptoFrom.current_price / selectedCryptoTo.current_price;

            setUsdValue(`${selectedCryptoFrom.current_price} USD`);
            setMaxValue(`${selectedCryptoFrom.ath} USD`);
            setPercentageChange(`${selectedCryptoFrom.price_change_percentage_24h}%`);
            setLastUpdated(new Date(selectedCryptoFrom.last_updated).toLocaleString());
            setCurrencyValue(`${valueInToCurrency.toFixed(8)} ${selectedCryptoTo.symbol}`);
            setRevertedValue(`${(1 / valueInToCurrency).toFixed(8)} ${selectedCryptoFrom.symbol}`);
        } else {
            console.error('No se pudo obtener información detallada de las monedas seleccionadas.');
        }
    };
    const callDataFastButton = (fromCurrency, toCurrency) => {
        convertCryptos(fromCurrency, toCurrency);
    };

    return (
        <div>
            <p>Currencys</p>
            <div className='select-currencys'>
                <div className='select-containers'>
                    {/* Componentes React para la interfaz gráfica */}
                    <div className='select-container'>
                        <label htmlFor="fromCurrency">From Currency:</label>
                        <select
                            id="fromCurrency"
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                        >
                            {cryptoData.map((crypto) => (
                                <option key={crypto.id} value={crypto.id}>
                                    {crypto.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='select-container'>
                        <label htmlFor="toCurrency">To Currency:</label>
                        <select
                            id="toCurrency"
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                        >
                            {cryptoData.map((crypto) => (
                                <option key={crypto.id} value={crypto.id}>
                                    {crypto.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <p>A ver que pongo aqui</p>
            </div>

            <button className='button' onClick={() => convertCryptos(fromCurrency, toCurrency)}>Convert</button>
            <button className='button' onClick={() => callDataFastButton('bitcoin', 'usdcoin')}>BTC - USDC</button>
            <button className='button' onClick={() => callDataFastButton('bitcoin', 'usdcoin')}>BTC - USDC</button>
            <button className='button' onClick={() => callDataFastButton('bitcoin', 'usdcoin')}>BTC - USDC</button>
            <button className='button' onClick={() => callDataFastButton('bitcoin', 'usdcoin')}>BTC - USDC</button>


            <div className='result-containers'>
                <div className='result-container'>
                    <label>Valor:</label>
                    <input type="text" id="maxValue" readOnly value={maxValue} />
                    <label>Percentage Change:</label>
                    <input type="text" id="percentageChange" readOnly value={percentageChange} />
                    <label>Last Updated:</label>
                    <input type="text" id="lastUpdated" readOnly value={lastUpdated} />
                    <p className='result'>Max Value: {maxValue}</p>
                    <p className='result'>Percentage Change: {percentageChange}</p>
                    <p className='result'>Last Updated: {lastUpdated}</p>
                </div>
                <div className='result-container'>
                    <label>Max. Valor histórico:</label>
                    <input type="text" id="maxValue" readOnly value={usdValue} />
                    <label>Conversión</label>
                    <input type="text" id="currencyValue" readOnly value={currencyValue} />
                    <label>Conversión2:</label>
                    <input type="text" id="revertedValue" readOnly value={revertedValue} />
                    <p className='result'>USD Value: {usdValue}</p>
                    <p className='result'>Currency Value: {currencyValue}</p>
                    <p className='result'>Reverted Value: {revertedValue}</p>
                </div>
            </div>
        </div>
    );
};

export default CryptoConverterApp;

/*import React, { useState, useEffect } from 'react';

const CryptoConverterApp = () => {
    const [fromCurrencyValue, setFromCurrencyValue] = useState('');
    const [toCurrencyValue, setToCurrencyValue] = useState('');
    const [usdValue, setUsdValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [percentageChange, setPercentageChange] = useState(0);
    const [lastUpdated, setLastUpdated] = useState('');
    const [currencyValue, setCurrencyValue] = useState(0);
    const [valorRevertido, setValorRevertido] = useState('');

    const [cryptosList, setCryptosList] = useState([]);
    const [selectedCryptos, setSelectedCryptos] = useState(['', '']);

    useEffect(() => {
        // Lógica para cargar la lista de criptomonedas desde la API
        const fetchCryptosList = async () => {
            try {
                const response = await fetch('URL_DE_TU_API');
                const data = await response.json();
                setCryptosList(data);
            } catch (error) {
                console.error('Error al cargar la lista de criptomonedas:', error);
            }
        };

        fetchCryptosList();
    }, []);

    const createCryptoFrame = (bgColor, textLabel, valueVar) => {
        // Implementa la lógica para crear el marco de criptomoneda
        // Puedes utilizar divs, labels, inputs, etc.
    };

    const createComboboxes = () => {
        // Implementa la lógica para crear los comboboxes
        // Puedes utilizar elementos select y option
    };

    const createButton = (text, onClickHandler) => {
        // Implementa la lógica para crear un botón
        // Puedes utilizar un elemento button
    };

    const convertCryptos = () => {
        // Implementa la lógica para convertir criptomonedas
        // Puedes utilizar la lista de criptomonedas (cryptosList) y los valores seleccionados (selectedCryptos)
    };

    const callData = () => {
        // Implementa la lógica para llamar a la función convertCryptos con los valores seleccionados
    };

    const callDataFastButton = (crypto1, crypto2) => {
        // Implementa la lógica para llamar a la función convertCryptos con valores predefinidos
    };

    return (
        <div>
            {/* Implementa la estructura de tu interfaz aquí *//*}
</div>
);
};

export default CryptoConverterApp;*/
/*
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crypto Converter App</title>
</head>
<body>
    <h1>Conversor de Criptomonedas</h1>
    
    <label for="fromCurrency">Moneda origen:</label>
    <select id="fromCurrency"></select>

    <label for="toCurrency">Moneda destino:</label>
    <select id="toCurrency"></select>

    <label for="usdValue">Valor:</label>
    <input type="text" id="usdValue" readonly>

    <label for="maxValue">Max. Valor Histórico:</label>
    <input type="text" id="maxValue" readonly>

    <label for="percentageChange">C.Porcentual en 24h:</label>
    <input type="text" id="percentageChange" readonly>

    <label for="lastUpdated">Última actualización:</label>
    <input type="text" id="lastUpdated" readonly>

    <label for="currencyValue">Conversión:</label>
    <input type="text" id="currencyValue" readonly>

    <label for="revertValue">Valor Revertido:</label>
    <input type="text" id="revertValue" readonly>

    <button onclick="callData()">CONVERTIR</button>
    <button onclick="revertConversion()">REVERTIR</button>

    <button onclick="callDataFastButton('bitcoin', 'usdcoin')">BTC -> USDC</button>
    <button onclick="callDataFastButton('ethereum', 'bitcoin')">ETH -> BTC</button>
    <button onclick="callDataFastButton('solana', 'bitcoin')">SOL -> BTC</button>
    <button onclick="callDataFastButton('cardano', 'ethereum')">ADA -> ETH</button>
    <button onclick="callDataFastButton('tether', 'bitcoin')">USDT -> BTC</button>

    <script>
        // Aquí irá tu código JavaScript
    </script>
</body>
</html>

*/
/*
Object { id: "bitcoin", symbol: "btc", name: "Bitcoin", … }
 ​
ath: 69045
 ​
ath_change_percentage: -39.45822
 ​
ath_date: "2021-11-10T14:24:11.849Z"
 ​
atl: 67.81
 ​
atl_change_percentage: 61545.11027
 ​
atl_date: "2013-07-06T00:00:00.000Z"
 ​
circulating_supply: 19598950
 ​
current_price: 42079
 ​
fully_diluted_valuation: 878785437477
 ​
high_24h: 43088
 ​
id: "bitcoin"
 ​
image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400"
 ​
last_updated: "2024-01-15T00:19:37.483Z"
 ​
low_24h: 41747
 ​
market_cap: 820155802373
 ​
market_cap_change_24h: -19067507268.33667
 ​
market_cap_change_percentage_24h: -2.27204
 ​
market_cap_rank: 1
 ​
max_supply: 21000000
 ​
name: "Bitcoin"
 ​
price_change_24h: -744.5093328208823
 ​
price_change_percentage_24h: -1.73857
 ​
roi: null
 ​
symbol: "btc"
 ​
total_supply: 21000000
 ​
total_volume: 15682706246
 ​

Object { id: "ethereum", symbol: "eth", name: "Ethereum", … }
 ​
ath: 4878.26
 ​
ath_change_percentage: -49.26223
 ​
ath_date: "2021-11-10T14:24:19.604Z"
 ​
atl: 0.432979
 ​
atl_change_percentage: 571549.3136
 ​
atl_date: "2015-10-20T00:00:00.000Z"
 ​
circulating_supply: 120181730.757895
 ​
current_price: 2490.91
 ​
fully_diluted_valuation: 297851900792
 ​
high_24h: 2573.37
 ​
id: "ethereum"
 ​
image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628"
 ​
last_updated: "2024-01-15T00:19:52.127Z"
 ​
low_24h: 2472.13
 ​
market_cap: 297851900792
 ​
market_cap_change_24h: -11422262745.115967
 ​
market_cap_change_percentage_24h: -3.69325
 ​
market_cap_rank: 2
 ​
max_supply: null
 ​
name: "Ethereum"
 ​
price_change_24h: -77.85235632375088
 ​
price_change_percentage_24h: -3.03073
*/
