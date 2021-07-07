import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useState } from 'react';

import db from '../db.json';

import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from '../src/components/Widget';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import GitHubCorner from '../src/components/GitHubCorner';
import Footer from '../src/components/Footer';

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

  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <>
      <QuizBackground backgroundImage={db.bg}>
        <QuizContainer>

          <QuizLogo />

          <Widget>
            <Widget.Header>
              <h1>Supernatural</h1>
            </Widget.Header>

            <Widget.Content>
              <form onSubmit={function (eventInfo) {
                eventInfo.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}>
                <Input
                  name="userName"
                  onChange={ (eventInfo) => setName(eventInfo.target.value) }
                  placeholder="Digite seu nome"
                  value={name}
                />
                <Button type="submit" disabled={ name.length === 0 } >
                  {`Jogar ${name}`}
                </Button>
              </form>
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

        <GitHubCorner projectUrl="https://github.com/loanmatteusz/AluraQuiz" />
      </QuizBackground>
    </>
  );
}
