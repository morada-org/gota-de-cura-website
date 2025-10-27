import { ProductType } from '../interfaces/products'

export const productTypes: ProductType[] = [
  // {
  //   id: "kits",
  //   type: "Semana de ofertas",
  //   description:
  //     "Kits com preços especiais para você aproveitar nossa semana de ofertas",
  //   image: "background-ofertas.jpg",
  //   seal: "https://firebasestorage.googleapis.com/v0/b/gota-de-luz.appspot.com/o/products%2Fseals%2Fseal-semanaofertas.png?alt=media&token=576422fb-912b-4602-9b44-2576e5d9e077",
  // },
  {
    id: 'hidrolatos',
    type: 'Hidrolatos - 120ml',
    typeLabel: 'Hidrolatos<br/><small>120ml</small>',
    description: `
      <b>Hidrolatos</b>, ou águas florais são também um produto do processo de destilação na extração dos óleos essenciais, onde o vapor d'água que atravessa a planta destilada arrasta também vários elementos da planta que, ao passarem ao estado líquido novamente, formam os hidrolatos. As embalagens padrão são de <b>120 ml</b>.
      <br/><br/>
      </div>
      `,
    image: 'hidrolatos.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'oleos-essenciais',
    type: 'Óleos essenciais',
    description: `
      Os <b>óleos essenciais</b> são extratos naturais superconcentrados, extraídos principalmente por método de destilação a vapor ou por prensagem a frio das flores, plantas e frutas. Possuem propriedades terapêuticas e diversos benefícios para a saúde devido a sua alta concentração e, por isso, não devem ser usados puros diretamente na pele. Podem ser usados na aromaterapia em difusores pessoais, de ambiente e diluídos em óleos vegetais. São totalmente naturais, sem corantes e sem quaisquer aditivos químicos. 
      <br/>
      `,
    image: 'oleos-essenciais.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'diluicoes-oleos-essenciais',
    type: 'Diluições',
    description:
      'As diluições de óleos essenciais são óleos vegetais (TCM) que servem para diluir os óleos essenciais, tornando-os seguros para uso na pele. São óleos vegetais puros, sem adição de conservantes ou corantes.<br/>Nossas diluições são a 2% (duas gotas de óleo essencial para cada 5ml de diluição)',
    image: 'diluicoes-oleos-essenciais.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'sabonetes',
    type: 'Sabonetes artesanais',
    description: `<p>Óleos vegetais e óleos essenciais.</p>
      <p>Ao invés de água, usamos hidrolatos na confecção dos nossos sabonetes. Hidrolatos orgânicos destilados na chácara da Morada (melaleuca, lavanda, immortelle e os demais que destilamos)!</p>`,
    image: 'sabonetes.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'sabonetes-argila',
    type: 'Sabonetes de argila',
    description: `<p>Com os tradicionais óleos vegetais já conhecidos por todos, porém sem os óleos essenciais.</p>
      <p>Uma linha apenas com o aroma dos óleos vegetais, predominando o aroma do azeite de oliva extra-virgem.</p>
      <p>Essa linha vem trazer a propriedade das argilas naturais. Enriquecidos com as argilas verde, vermelha, roxa, amarela, branca e preta.</p>`,
    image: 'sabonetes-argila.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'sabonetes-manteiga',
    type: 'Sabonetes de manteiga',
    description: `<p>Feitos com azeite de oliva extra virgem, cada sabonete é cuidadosamente elaborado para proporcionar uma experiência única de cuidado com a pele.</p>
      <p>Ao invés de água, usamos hidrolatos na confecção dos nossos sabonetes. Hidrolatos orgânicos destilados na chácara da Morada (melaleuca, lavanda, immortelle e os demais que destilamos)!</p>`,
    image: 'sabonetes-manteiga.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'hidrolatos-1l',
    type: 'Hidrolatos - 1 litro',
    typeLabel: 'Hidrolatos<br/><small>1 litro</small>',
    description: `
      <b>Hidrolatos</b>, ou águas florais são também um produto do processo de destilação na extração dos óleos essenciais, onde o vapor d'água que atravessa a planta destilada arrasta também vários elementos da planta que, ao passarem ao estado líquido novamente, formam os hidrolatos.</b>.
      `,
    image: 'hidrolatos-1l.jpg',
    seal: '',
    mode: 'type',
  },

  {
    id: 'sais',
    type: 'Sais de banho',
    description:
      'O uso de sais de banho e escaldapé são muitos relaxantes e terapêuticos. Ao deixar seus pés de molho numa água morna com sal, você vai sentir o alívio do estresse do dia a dia e das tensões acumuladas. <br/><br/>Aliando o aroma e o poder terapêuticodos óleos essenciais à esses sais, você verá os efeitos tranquilizantes ainda mais potencializados e ainda vai aproveitar das propriedades específicas que cada planta tem a oferecer.',
    image: 'sais.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'sprays',
    type: 'Sprays',
    description:
      'Produtos feitos à base de óleos essenciais e álcool de cereais. Livre de essências sintéticas.',
    image: 'sprays.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'sprays-topicos',
    type: 'Sprays tópicos',
    description: `<p>Sprays naturais para uso sobre a pele</p>`,
    image: 'sprays-topicos.jpg',
    seal: 'https://firebasestorage.googleapis.com/v0/b/gota-de-luz.appspot.com/o/products%2Fseals%2Fseal-new.png?alt=media&token=9ad4fc11-08a0-43a9-b350-b20b57dbac92',
    mode: 'type',
  },
  {
    id: 'pomadas',
    type: 'Pomadas',
    description:
      'Pomadas de uso tópico confeccionadas com óleos vegetais e óleos essenciais. Livre de conservantes.',
    image: 'pomadas.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'colonias',
    type: 'Colonias',
    typeLabel: 'Águas de Colônia',
    description:
      ' Produtos feitos à base de óleos essenciais e álcool de cereais. Livre de essências sintéticas.',
    image: 'colonias.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'tinturas',
    type: 'Tinturas',
    typeLabel: 'Tinturas',
    description:
      'Tinturas são extratos alcoólicos de substâncias naturais, como ervas ou princípios ativos de plantas medicinais. Elas são preparadas pela dissolução dessas substâncias em um veículo alcoólico, sendo uma forma comum de apresentação farmacêutica. O álcool é usado para extrair os compostos desejados, tornando as tinturas uma opção eficaz para o uso medicinal.',
    image: 'tinturas.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'acessorios',
    type: 'Acessórios',
    description: '',
    image: 'acessorios.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'vales',
    type: 'Vales',
    typeLabel: 'Vale-Presente',
    description:
      'Que tal dar um vale-presente para alguém querido?<br/>Os vales podem ser usados pelo site ou na nossa loja física.',
    image: 'vales.jpg',
    seal: '',
    mode: 'type',
  },
  {
    id: 'amazonia',
    type: 'Cantinho da Amazônia',
    typeLabel: 'Cantinho da Amazônia',
    customClassName: 'cols-span-2 md:col-span-3',
    description: `<section class="amazonia-section">
        <p>
          Um espaço dedicado à sabedoria, à força e ao encanto da floresta.
        </p>
        <p>
          Aqui, reunimos produtos cuidadosamente selecionados que carregam a essência das plantas amazônicas —
          feitos com respeito às pessoas, aos territórios e à natureza que os inspira.
        </p>
        <p>
          Hidrolatos, óleos essenciais, tinturas e sabonetes que trazem a vibração do breu branco, cumaru,
          copaíba, pau rosa, açaí e outras preciosidades da mata. 
        </p>
        <p>
          Mais do que aromas, são expressões vivas de cura, ancestralidade e presença.  
          Uma conexão profunda com a floresta — no toque, no cheiro, no cuidado.
        </p>
      </section>`,

    image: 'amazonia.jpg',
    seal: 'https://firebasestorage.googleapis.com/v0/b/gota-de-luz.appspot.com/o/products%2Fseals%2Fseal-new.png?alt=media&token=9ad4fc11-08a0-43a9-b350-b20b57dbac92',
    mode: 'category',
    areaBackground: '/images/background-amazonia.jpg',
  },
]
