import styles from './../styles/questions.module.scss'

const Questions = () => (
  <div className={styles.questionsArea}>
    <h2 className="fancy-title" style={{ display: 'block' }}>
      Perguntas frequentes
    </h2>
    <details>
      <summary>Os produtos são totalmente artesanais?</summary>
      <p>
        Epcot is a theme park at Walt Disney World Resort featuring exciting attractions,
        international pavilions, award-winning fireworks and seasonal special events.
      </p>
    </details>
    <details>
      <summary>As ervas usadas são frescas?</summary>
      <p>
        Epcot is a theme park at Walt Disney World Resort featuring exciting attractions,
        international pavilions, award-winning fireworks and seasonal special events.
      </p>
    </details>
    <details>
      <summary>Epcot Center</summary>
      <p>
        Epcot is a theme park at Walt Disney World Resort featuring exciting attractions,
        international pavilions, award-winning fireworks and seasonal special events.
      </p>
    </details>
    <details>
      <summary>Epcot Center</summary>
      <p>
        Epcot is a theme park at Walt Disney World Resort featuring exciting attractions,
        international pavilions, award-winning fireworks and seasonal special events.
      </p>
    </details>
  </div>
)

export default Questions
