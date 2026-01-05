import Layout from 'components/Layout'
import { VisitCTA } from 'components/visitas/VisitCTA'
import { VisitListDisplayer } from 'components/visitas/VisitListDisplayer'
import ImageGallery from 'react-image-gallery'
import styled from 'styled-components'
import { images, testimony } from '../../lib/data'

const StyledVisitasArea = styled.section`
  padding: 80px 10px;
  max-width: 800px;
  margin: 0 auto;

  .testimony-item {
    font-size: 1rem;
    padding: 2rem;
    margin-bottom: 1rem;
    background-color: #f4eef2;
    .name {
      font-weight: bold;
      font-size: 1.1rem;
    }
    .date {
      margin-bottom: 1rem;
    }
  }
`

const Visitas = () => {
  return (
    <>
      <Layout title={process.env.NEXT_PUBLIC_COMPANY_NAME}>
        <StyledVisitasArea>
          <h1 className="text-4xl font-semibold mt-10">Visitação</h1>

          <VisitListDisplayer />

          <div className="my-5 flex justify-center">
            <VisitCTA />
          </div>

          <h3 className="text-2xl font-semibold mt-10">
            Conheça mais sobre a visita guiada à Chácara Mãe Luzia
          </h3>

          <p className="mb-4">
            É nessa chácara que são cultivadas as plantas que são destiladas para a
            obtenção dos insumos dos produtos Gota de Cura.
          </p>

          <p className="mb-4">
            Localizada próxima à Holambra (cerca de 40 minutos de Campinas/SP), a
            propriedade é da Morada Espírita Prof. Lairi Hans, instituição localizada em
            Campinas, fundada em 1980.
          </p>

          <p className="mb-4">
            A programação, com previsão de 4 horas de duração, consiste em apresentar o
            funcionamento da chácara, uma pequena propriedade, cujas atividades visam
            única e exclusivamente apoiar os trabalhos assistenciais da Morada: criação de
            galinhas caipiras, cultivo de verduras e plantas aromáticas. Sem o uso de
            agrotóxicos, regadas com água de nascente, adubadas com fertilizantes naturais
            e com o uso de energia limpa.
          </p>

          <p className="mb-4">
            Todos são recebidos com um gostoso café da manhã, preparado com muito carinho.
          </p>

          <p className="mb-4">
            Além de conhecer o funcionamento da chácara, vamos acompanhar a destilação de
            uma planta aromática (para obtenção de óleo essencial e hidrolato), plantada,
            cultivada e colhida na chácara com todo o cuidado e respeito para que o
            produto final da destilação possa oferecer o melhor em temos de ativos
            terapêuticos e vibracionais.
          </p>

          <p className="mb-4">
            Teremos no dia da visitação, à disposição de todos dos interessados, os
            artesanatos feitos pelas voluntárias da Morada e os produtos Gota de Cura.
          </p>

          <p className="mb-4 font-semibold">
            A programação se inicia pontualmente às 8h, com encerramento às 12h.
          </p>

          <p className="mb-4 font-semibold">
            O deslocamento é por conta de cada um. Após fecharmos o grupo, passaremos mais
            detalhes e orientações.
          </p>

          <p>
            <p className="text-lg">
              <b>Valor por pessoa</b>:
              <br /> R$ 140,00 (acima de 15 anos)
              <br />
              <span className="text-sm text-gray-700">R$ 50,00 (de 8 a 14 anos)</span>
              <br /> <span className="text-sm text-gray-700">isento: até 7 anos</span>
            </p>
          </p>

          <h3 className="border-t mt-4 pt-4 text-2xl font-semibold">Galeria de fotos</h3>
          <ImageGallery items={images} />
          <div className="flex justify-center">
            <a
              href="https://photos.app.goo.gl/mUkLpDGD5DUaERqR9"
              target="blank"
              className="cta-button"
            >
              + Fotos
            </a>
          </div>

          <h3 className="border-t mt-4 pt-4 text-2xl font-semibold">Depoimentos</h3>
          <p className="mt-4">
            Confira os depoimentos muito especiais de quem já visitou a Chácara!
          </p>

          {testimony.map((item) => (
            <div className="testimony-item">
              <div className="name">{item.name}</div>
              <div className="date">{item.date}</div>
              {item.text}
            </div>
          ))}

          <VisitCTA />
        </StyledVisitasArea>
      </Layout>
    </>
  )
}

export default Visitas
