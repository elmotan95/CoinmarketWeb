import styles from '../../styles/Market.module.css'
import SVG from 'react-inlinesvg';
import useMarketList from "../../modules/market/functions/useMarketList";
import usePriceUpdate from "../../modules/market/functions/useMarketPrice";
import { NumericFormat } from 'react-number-format';

const Market = () => {
  const marketList = useMarketList();
  const priceUpdate = usePriceUpdate();

  const data = marketList.data?.marketData || {};
  const coinKey = marketList.data?.marketKeys || [];
  const priceData = priceUpdate.data || {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Harga Crypto dalam Rupiah Hari Ini</h2>
      </div>

      <div/>

      <table className={styles.contentContainer}>
        <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col">CRYPTO</th>
          <th scope="col"></th>
          <th scope="col">HARGA</th>
          <th scope="col">24 JAM</th>
          <th scope="col">1 MGG</th>
          <th scope="col">1 BLN</th>
          <th scope="col">1 THN</th>
        </tr>
        </thead>
        <tbody id="cursorPointer">
        {coinKey.map(item => {
          const dayChangeValue = priceData[item]?.day || 0;
          const isDayBelowZero = dayChangeValue < 0
          const weekChangeValue = priceData[item]?.week || 0;
          const isWeekBelowZero = weekChangeValue < 0
          const monthChangeValue = priceData[item]?.month || 0;
          const isMonthBelowZero = monthChangeValue < 0
          const yearChangeValue = priceData[item]?.year || 0;
          const isYearBelowZero = yearChangeValue < 0


          return (
            <tr className={styles.row} key={item}>
              <td><SVG uniquifyIDs={true} cacheRequests={true} src={data[item].logo} width={30} height={30} preProcessor={(code) => code.replace(/fill="currentColor"/g, `fill="${data[item].color}"`)}></SVG></td>
              <td><p>{data[item].name}</p></td>
              <td><p>{data[item].currencySymbol}</p></td>
              <td>
                <NumericFormat
                  displayType="text"
                  thousandSeparator={'.'}
                  decimalSeparator={','}
                  thousandsGroupStyle={'thousand'}
                  value={priceData?.[item]?.latestPrice || 0}
                  renderText={value => (
                    <p>{value}</p>
                  )}
                  prefix="Rp"
                />
              </td>
              <td><p style={{color: isDayBelowZero ? '#ff4b4b' : '#53da53'}}>{dayChangeValue}%</p></td>
              <td><p style={{color: isWeekBelowZero ? '#ff4b4b' : '#53da53'}}>{weekChangeValue}%</p></td>
              <td><p style={{color: isMonthBelowZero ? '#ff4b4b' : '#53da53'}}>{monthChangeValue}%</p></td>
              <td><p style={{color: isYearBelowZero ? '#ff4b4b' : '#53da53'}}>{yearChangeValue}%</p></td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}

export default Market;
