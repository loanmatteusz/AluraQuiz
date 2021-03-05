import styled from 'styled-components'
import db from '../db.json'

import QuizBackground from '../src/components/QuizBackground'
import Widget from '../src/components/Widget'
import GitHubCorner from '../src/components/GitHubCorner'
import Footer from '../src/components/Footer'

export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;

  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <>
      <QuizBackground backgroundImage={ db.bg }>
        <QuizContainer>

          <Widget>
            <Widget.Header>
              <h1>Valorant</h1>
            </Widget.Header>

            <Widget.Content>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </Widget.Content>
          </Widget>
          
          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
            </Widget.Content>
          </Widget>

          <Footer />
        </QuizContainer>

        <GitHubCorner projectUrl="https://github.com/loanmatteusz/AluraQuiz"/>
      </QuizBackground>
    </>
  )
}
