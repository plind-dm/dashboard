import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useTokenState } from '../../context/token'
import { useDevices } from '../../hooks/useDevices'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const LineChart = (): React.ReactElement => {
  const { currentToken } = useTokenState()
  const [prices, setPrices] = useState<Array<number>>([])
  const [dates, setDates] = useState<Array<string>>([])
  const { isMobile } = useDevices()
  useEffect(() => {
    const parseChartData = (): void => {
      const pricesAr = [],
        datesAr = []
      for (const priceHistory of currentToken.prices) {
        datesAr.push(new Date(priceHistory[0]).toLocaleString('en-US'))
        pricesAr.push(priceHistory[1])
      }
      setPrices(pricesAr)
      setDates(datesAr)
    }
    parseChartData()
  }, [currentToken])

  return (
    <div>
      <Line
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            xAxis: {
              display: false
            },
            yAxis: {
              display: !isMobile
            },
            grid: {
              display: false
            }
          }
        }}
        data={{
          labels: dates,
          datasets: [
            {
              label: '',
              backgroundColor: '#994D7E',
              borderColor: '#994D7E',
              borderCapStyle: 'round',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'round',
              pointBorderColor: '#994D7E',
              pointBackgroundColor: '#994D7E',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: '#994D7E',
              pointHoverBorderColor: '#994D7E',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: prices
            }
          ]
        }}
      />
    </div>
  )
}

export { LineChart }
