import emailjs from '@emailjs/browser'
import { InscricaoData } from 'interfaces/visits'
import { formatDateUTC } from 'utils/format'

const EMAIL_SERVICE_ID = 'service_nbvmzkk'
const EMAIL_TEMPLATE_ID = 'gota-de-cura-email'
const EMAIL_PUBLIC_KEY = 'nkdbOud2NdTKI7vBK'

const sendNewOrderEmail = async (
  orderNumber: number,
  clientName: string,
  mailList: string[],
): Promise<void> => {
  emailjs.send(
    EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID,
    {
      title: `🟣 Novo pedido no site: #${orderNumber}`,
      html_message: `<p style="font-size: 20px">Novo pedido (#${orderNumber}) feito no Gota de Cura de&nbsp;<strong>${clientName}</strong>.</p>
      <hr>
      <p>Acesse a &aacute;rea de pedidos do Painel de Administrador do site Gota de Cura para ver os pedidos.
      <a style="color: #1155cc; font-size: small;" href="https://gotadecura.com.br/admin/pedidos" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://gotadecura.com.br/admin/pedidos&amp;source=gmail&amp;ust=1656279865216000&amp;usg=AOvVaw3lxiqiYazuRuntDO6vGblT">https://gotadecura.com.br/<wbr>admin/pedidos</a></p>`,
      mail_list: mailList.join(','),
    },
    EMAIL_PUBLIC_KEY,
  )
}

const sendNewEnrollmentEmail = async (
  visitDate: string,
  enrollmentData: InscricaoData,
  mailList: string[],
): Promise<void> => {
  emailjs.send(
    EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID,
    {
      title: `🌟 Inscrição para visitação de ${enrollmentData.name}`,
      html_message: `<p style="font-size: 20px;margin-bottom: 20px;font-weight: bold">Nova inscrição para visitação realizada pelo site!</p>

      <p><b>Data</b>: ${formatDateUTC(visitDate)}</p>
      <p><b>Nome</b>: ${enrollmentData.name}</p>
      <p><b>Celular</b>: ${enrollmentData.cellphone}</p>
      <p><b>Email</b>: ${enrollmentData.email}</p>
      <p><b>Acompanhantes</b>: ${(enrollmentData.companions ?? []).join(', ')}</p>
      <p><b>Última visita</b>: ${enrollmentData.lastVisit}</p>
      
      <hr/>
      Para acessar as informações acesse <a href="https://www.gotadecura.com.br/admin/visitas">gotadecura.com.br/admin/visitas</a>`,
      mail_list: mailList.join(','),
    },
    EMAIL_PUBLIC_KEY,
  )
}

const sendEnrollmentGreetingEmail = async (
  visitorName: string,
  mailList: string[],
): Promise<void> => {
  emailjs.send(
    EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID,
    {
      title: `🪻 ${visitorName}, sua inscrição foi realizada `,
      html_message: `
      <div style="font-size: 18px">
      <p style="font-weight:bold;font-size:22px">${visitorName}, agradecemos pela sua inscrição! 🎉</p>
      <p>Ficaremos muito felizes em te receber na Chácara da Mãe Luzia e sua presença vai perfurmar ainda mais nossos canteiros!</p>
      <p style="font-weight: bold">Em breve, um de nossos voluntários vai entrar em contato com você para acertar os detalhes!</p>
      <p>Até lá, se quiser ver mais sobre a visitação, ver fotos e depoimentos de quem já foi, acesse nossa página: <a href="https://www.gotadecura.com.br/visitas">gotadecura.com.br/visitas</a> e nos acompanhe pelo <a href="https://www.instagram.com/gotadecura_artesanais/">Instagram</a>!</p>
      <p style="background-color: #fbffc0; padding: 20px; border-radius: 20px; font-size: 14px; margin-top: 50px; font-style: italic; text-align: left">
      <b>Importante:</b><br/><br/>
      ⚠️ A programação se inicia pontualmente às 8h, com encerramento às 12h.<br/><br/>
      ⚠️ O deslocamento é por conta de cada um. Após fecharmos o grupo, passaremos mais detalhes e orientações.<br/><br/>
      ⚠️ O valor é de R$ 120,00 por pessoa acima de 15 anos / R$ 40,00 por pessoa de 8 a 14 anos / isento até 7 anos.</p>
      <hr/>
      <div style="font-size: 14px; text-align: left">
        <h4>Informativos sobre o pagamento:</h4>
        <p>
          ⚠️ O pagamento será combinado com a equipe Gota de Cura. A garantia da vaga
          se dá após a confirmação e o pagamento da taxa.
        </p>

        <p><b>Sobre desistência e reembolso:</b></p>
        <p>
          ⚠️ Até 14 dias antes do evento: reembolso de <b>50% do valor</b> através de
          transferência bancária.
        </p>

        <p>
          ⚠️ Até 7 dias antes do evento: reembolso de <b>50% do valor</b> através de
          vale-presente para compra de produtos pelo site ou loja (frete não incluso).
        </p>

        <p>
          ⚠️ Com menos de 7 dias para o evento:
          <u> não haverá reembolso, nem reserva de vaga para eventos futuros, nem troca
            por produtos.</u>.
        </p>
      </div>
      <p style="margin-top: 50px">Atenciosamente,<br/>Equipe Gota de Cura</p></div>`,
      mail_list: mailList.join(','),
    },
    EMAIL_PUBLIC_KEY,
  )
}

const sendVisitThankEmail = async (
  visitorName: string,
  visitorEmail: string,
  // coupons: string,
  bccList: string,
): Promise<void> => {
  emailjs.send(
    EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID,
    {
      title: `${visitorName}, agradecemos a sua visita 💖`,
      html_message: `
      <div style="max-width: 500px; margin: 0 auto">
        <div style="color: #333; font-size: 15px">
          <p style="font-size: 18px"><b>${visitorName}</b>,</p>
          <p>
            Sua presença na visita à Chácara da Mãe Luzia deixou o nosso dia mais feliz. Ter a
            sua companhia explorando conosco os encantos e os aromas do nosso santuário de
            plantas aromáticas foi um grande prazer!
          </p>
          <p>
            Cada grupo que recebemos enche nossos corações de calor e inspiração, reafirmando o
            propósito que nos motiva a cada dia.
          </p>
          <p>
            Na Chácara da Mãe Luzia, não cultivamos apenas plantas, cultivamos sonhos, cuidado e
            respeito pela Mãe Natureza. Cada broto que nasce na chácara é um testemunho da
            presença de Deus em nossas vidas e do nosso compromisso com a responsabilidade
            social, a sustentabilidade e a qualidade dos nossos produtos.
          </p>
          <p>
            Nossa jornada na busca pela excelência em produtos de aromaterapia tem como alicerce
            os valores: qualidade, inovação e transparência em nossos processos. Valores que
            você pode conferir nessa visita tão especial.
          </p>
          <p>
            Cada produto adquirido se transforma na fatia de pão para nossos irmãos em
            necessidade!
          </p>
          <p>
            Esperamos que sua visita tenha sido enriquecedora e que tenha sentido em cada brisa
            que sopra entre as plantações o carinho com que cuidamos desse espaço, uma
            verdadeira farmácia a céu aberto.
          </p>
          <p>
            Lembre-se sempre do nosso convite para retornar e continuar compartilhando conosco essa
            jornada de descobertas e conexões com a natureza.
          </p>
          <p>
            Mais uma vez, agradecemos pela sua visita e por ser parte essencial do nosso
            universo aromático.
          </p>
          <p>
            Com os mais sinceros agradecimentos,<br />
            Equipe Gota de Cura
          </p>
        </div>
        <div
          style="background-color: #eee;border-radius: 10px;padding: 10px;color: #888;margin-bottom: 25px;font-size: 14px;">
          <p style="font-size: 18px">Veja mais:</p>
          <p>
            📷 Veja as fotos da visita:
            <a href="https://photos.app.goo.gl/aWe9xYmrsTMo22sp9" target="_blank">Visita Chácara Mãe Luzia - 21.09.24</a>
          </p>
          <p>
            💬 Deixe um depoimento sobre sua experiência:
            <a href="https://forms.gle/oJxGeuXHJWgv37tW6" target="_blank">Clique aqui</a>
          </p>
        </div>
      </div>`,
      mail_list: visitorEmail,
      bcc_mail_list: bccList,
    },
    EMAIL_PUBLIC_KEY,
  )
}

export const EmailSender = {
  sendNewOrderEmail,
  sendNewEnrollmentEmail,
  sendEnrollmentGreetingEmail,
  sendVisitThankEmail,
}
