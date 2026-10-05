import { mnistAccuracy } from '../../content/charts';
import { useLang } from '../../i18n/useLang';
import './AccuracyDotPlot.css';

/**
 * Nuage de points horizontal (une ligne par représentation).
 * Points pleins = représentations apprises, points creux = références :
 * l'identité ne repose jamais sur la couleur seule (légende + étiquettes directes + tableau).
 */
export function AccuracyDotPlot() {
  const { lang, t } = useLang();
  const { domain, ticks, points } = mnistAccuracy;
  const fmt = new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  const tickFmt = new Intl.NumberFormat(lang === 'fr' ? 'fr-FR' : 'en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const colon = lang === 'fr' ? ' : ' : ': ';
  const pct = (v: number) => ((v - domain[0]) / (domain[1] - domain[0])) * 100;

  return (
    <figure className="dotplot" aria-labelledby="dotplot-title">
      <figcaption>
        <p id="dotplot-title" className="dotplot-title">
          {mnistAccuracy.title[lang]}
        </p>
        <ul className="dotplot-legend" role="list">
          <li>
            <span className="dp-mark is-learned" aria-hidden="true" />
            {t.chart.learned}
          </li>
          <li>
            <span className="dp-mark is-baseline" aria-hidden="true" />
            {t.chart.baseline}
          </li>
        </ul>
      </figcaption>

      <div className="dotplot-body" aria-hidden="true">
        {points.map((p) => (
          <div className="dp-row" key={p.label.en}>
            <span className="dp-label">
              {p.label[lang]}
              <span className="dp-dims mono">
                {p.dims} {t.chart.dims.toLowerCase()}
              </span>
            </span>
            <span className="dp-track">
              {ticks.map((tick) => (
                <span key={tick} className="dp-grid" style={{ left: `${pct(tick)}%` }} />
              ))}
              <span className="dp-point" style={{ left: `${pct(p.accuracy)}%` }}>
                <span className={`dp-mark ${p.learned ? 'is-learned' : 'is-baseline'}`} />
                <span className="dp-value mono">{fmt.format(p.accuracy)}</span>
                <span className={`dp-tooltip ${pct(p.accuracy) > 50 ? 'is-left' : 'is-right'}`} role="tooltip">
                  <strong>{p.label[lang]}</strong>
                  <span>
                    {t.chart.dims}
                    {colon}
                    {p.dims}
                  </span>
                  <span>
                    {t.chart.accuracy}
                    {colon}
                    {fmt.format(p.accuracy)}
                  </span>
                </span>
              </span>
            </span>
          </div>
        ))}
        <div className="dp-row dp-axis">
          <span />
          <span className="dp-track">
            {ticks.map((tick) => (
              <span key={tick} className="dp-tick mono" style={{ left: `${pct(tick)}%` }}>
                {tickFmt.format(tick)}
              </span>
            ))}
          </span>
        </div>
      </div>

      <p className="dotplot-caption">{mnistAccuracy.caption[lang]}</p>

      <details className="dotplot-table">
        <summary>{t.chart.showTable}</summary>
        <table>
          <caption className="visually-hidden">{mnistAccuracy.title[lang]}</caption>
          <thead>
            <tr>
              <th scope="col">{t.chart.representation}</th>
              <th scope="col">{t.chart.dims}</th>
              <th scope="col">{t.chart.accuracy}</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.label.en}>
                <th scope="row">{p.label[lang]}</th>
                <td className="mono">{p.dims}</td>
                <td className="mono">{fmt.format(p.accuracy)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
