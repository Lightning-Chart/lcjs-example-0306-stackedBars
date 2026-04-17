window.lcjsSmallView = window.devicePixelRatio >= 2
if (!window.__lcjsDebugOverlay) {
    window.__lcjsDebugOverlay = document.createElement('div')
    window.__lcjsDebugOverlay.style.cssText = 'position:fixed;top:10px;left:10px;background:rgba(0,0,0,0.7);color:#fff;padding:4px 8px;z-index:99999;font:12px monospace;pointer-events:none'
    const attach = () => { if (document.body && !window.__lcjsDebugOverlay.parentNode) document.body.appendChild(window.__lcjsDebugOverlay) }
    attach()
    setInterval(() => {
        attach()
        window.__lcjsDebugOverlay.textContent = window.innerWidth + 'x' + window.innerHeight + ' dpr=' + window.devicePixelRatio + ' small=' + window.lcjsSmallView
    }, 500)
}
/*
 * LightningChart JS Example that showcases Stacked Bars Chart.
 */
// Import LightningChartJS
const lcjs = require('@lightningchart/lcjs')

// Extract required parts from LightningChartJS.
const { lightningChart, BarChartSorting, Themes } = lcjs

const barChart = lightningChart({
            resourcesBaseUrl: new URL(document.head.baseURI).origin + new URL(document.head.baseURI).pathname + 'resources/',
        })
    .BarChart({
        theme: (() => {
    const t = Themes[new URLSearchParams(window.location.search).get('theme') || 'darkGold'] || undefined
    return t && window.lcjsSmallView ? lcjs.scaleTheme(t, 0.5) : t
})(),
textRenderer: window.lcjsSmallView ? lcjs.htmlTextRenderer : undefined,
    })
    .setTitle('% of market share by mobile OS in 1999-2021')
    .setValueLabels(undefined)

barChart.setDataStacked(
    ['1999', '2004', '2009', '2014', '2019', '2021'],
    [
        { subCategory: 'Symbian OS', values: [1, 51, 43, 0, 0, 0] },
        { subCategory: 'Palm OS', values: [66, 18, 1, 0, 0, 0] },
        { subCategory: 'BlackBerry OS', values: [1, 7, 20, 0.5, 0, 0] },
        { subCategory: 'Windows Mobile', values: [20, 13, 7, 2, 0, 0] },
        { subCategory: 'iOS', values: [0, 0, 15, 19, 14, 27] },
        { subCategory: 'Android', values: [0, 0, 8, 77, 82, 72] },
        { subCategory: 'Other', values: [12, 11, 6, 1.5, 4, 1] },
    ],
)

barChart.valueAxis.setTitle('Market share').setUnits('%')
