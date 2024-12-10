document.addEventListener("DOMContentLoaded", ()=>{

    const noticias = [
        {
            "NoticiaP": [
                {
                    id: "noticiaP-right",
                    "Titulo": "Mundo: conheça brasileiros que transformam vidas com a economia solidária",
                    "ResumoNoticia": "Esperança, união e solidariedade: programa de sexta-feira (17) mostrou iniciativas que funcionam como uma semente de esperança em tempos difíceis.",
                    "Noticia": "Essas iniciativas, espalhadas por todo o Brasil, têm como base a economia solidária, um modelo econômico que prioriza o bem-estar coletivo e a sustentabilidade. Em comunidades carentes, pequenos empreendedores se unem para criar cooperativas e associações que geram emprego e renda, promovendo a inclusão social e econômica.\n\nUm exemplo inspirador é o projeto 'Mãos Unidas', localizado no interior de Minas Gerais. Formado por artesãs locais, o grupo produz peças de artesanato utilizando materiais recicláveis. Além de gerar renda para as famílias envolvidas, o projeto também contribui para a preservação do meio ambiente.\n\nOutro destaque é a cooperativa 'Sabor da Terra', no Nordeste, que reúne agricultores familiares para a produção e comercialização de alimentos orgânicos. A iniciativa não só melhora a qualidade de vida dos produtores, mas também oferece produtos saudáveis e acessíveis para a comunidade.\n\nEssas histórias mostram que, mesmo em tempos de crise, a solidariedade e a cooperação podem transformar vidas e construir um futuro mais justo e sustentável para todos."
                }
            ],
           "SubNoticia1": [
                {
                    id: "box1",
                    "Titulo": "Contamos com Sua Ajuda",
                    "ResumoNoticia": "Sua generosidade é essencial para apoiar comunidades vulneráveis e promover um futuro mais justo e solidário.",
                    "Noticia": "As doações desempenham um papel vital na construção de uma sociedade mais justa e solidária. Seja através de contribuições financeiras, doação de alimentos, roupas ou até mesmo tempo e habilidades, cada ato de generosidade tem um impacto significativo na vida de muitas pessoas. As doações permitem que organizações sem fins lucrativos e ONGs continuem seu trabalho essencial, oferecendo suporte a comunidades vulneráveis, promovendo a educação, fornecendo assistência médica e combatendo a fome e a pobreza. Sem o apoio contínuo de doadores, muitos desses programas e serviços cruciais não seriam possíveis. Além disso, as doações ajudam a criar um senso de comunidade e união. Quando contribuímos para causas importantes, estamos investindo no bem-estar coletivo e demonstrando que nos importamos com o próximo. Esse espírito de solidariedade é fundamental para enfrentar desafios sociais e construir um futuro melhor para todos. Cada doação, por menor que seja, faz a diferença. Juntos, podemos transformar vidas e proporcionar esperança para aqueles que mais precisam. Contamos com sua ajuda para continuar essa missão de amor e cuidado. Doe hoje e faça parte dessa corrente do bem. Sua generosidade é a chave para um mundo mais humano e solidário."
                }
            ],
            "SubNoticia2": [
                {
                    id: "box2",
                    "Titulo": "Doação de Sangue Salva Vidas",
                    "ResumoNoticia": "A doação de sangue é um ato de solidariedade que pode fazer a diferença entre a vida e a morte para muitas pessoas.",
                    "Noticia": "A doação de sangue é um ato de solidariedade que pode fazer a diferença entre a vida e a morte para muitas pessoas. Cada doação pode salvar até quatro vidas, fornecendo componentes essenciais do sangue, como plaquetas, plasma e glóbulos vermelhos, para pacientes que necessitam de transfusões. Os benefícios da doação de sangue são imensos. Ela é crucial para o tratamento de vítimas de acidentes, pacientes submetidos a cirurgias complexas, pessoas com doenças crônicas, como anemia falciforme, e aqueles que estão em tratamento contra o câncer. Além disso, em situações de emergência, como desastres naturais, a disponibilidade de sangue pode ser a chave para salvar inúmeras vidas. Doar sangue é um processo seguro e rápido. Antes da doação, os doadores passam por uma triagem para garantir que estão aptos a doar, protegendo tanto o doador quanto o receptor. O procedimento em si leva cerca de 10 a 15 minutos, e o corpo rapidamente repõe o volume de sangue doado. Para muitos, a doação de sangue é uma forma de retribuir à comunidade e ajudar aqueles que estão em necessidade. É um gesto simples, mas de grande impacto, que demonstra empatia e compromisso com o bem-estar coletivo. Se você está saudável e atende aos requisitos para doação, considere fazer parte dessa corrente do bem. Procure o banco de sangue mais próximo e informe-se sobre como doar. Lembre-se: sua doação pode salvar vidas e trazer esperança para muitas famílias. Doe sangue, doe vida."
                }
            ],
            "TopNoticia1": [
                {
                    id: "TP1",
                    class: "",
                    "Titulo": "Organização Ambiental Fomenta Energias Renováveis em Regiões Carentes",
                    "ResumoNoticia": "A ONG Energia Sustentável para Todos está implementando um projeto que visa levar energias renováveis, como a solar e a eólica, a comunidades rurais de baixa renda no interior do Brasil.",
                    "Noticia": "O projeto tem como objetivo principal reduzir a dependência dessas comunidades de fontes de energia não renováveis, que são frequentemente caras e prejudiciais ao meio ambiente. Ao instalar painéis solares e turbinas eólicas, a ONG espera não apenas fornecer uma fonte de energia limpa e sustentável, mas também promover a autonomia energética dessas regiões. Além da instalação dos equipamentos, a ONG está investindo na capacitação dos moradores locais. Cursos e workshops estão sendo oferecidos para ensinar as comunidades a operar e manter os sistemas de energia renovável, garantindo a sustentabilidade a longo prazo do projeto. Essa abordagem educacional também visa criar oportunidades de emprego e desenvolvimento econômico local. O impacto esperado do projeto é significativo. Com acesso a energia renovável, as comunidades poderão melhorar sua qualidade de vida, com eletricidade confiável para escolas, centros de saúde e pequenas empresas. Isso também contribuirá para a redução das emissões de carbono, alinhando-se aos esforços globais de combate às mudanças climáticas. A ONG Energia Sustentável para Todos continua a buscar parcerias e financiamento para expandir o alcance do projeto, com a visão de transformar a realidade energética de muitas outras comunidades carentes no Brasil. Através dessa iniciativa, a organização reafirma seu compromisso com a justiça social e ambiental, demonstrando que é possível promover o desenvolvimento sustentável de maneira inclusiva e eficaz."
                }
            ],
            "TopNoticia2": [
                {
                    id: "TP2",
                    "Titulo": "Iniciativa Ambiental: ONG Mobiliza Comunidades para Limpeza de Rios e Praias",
                    "ResumoNoticia": "Com a campanha Águas Limpas, a ONG Verde Vivo organizou mutirões de voluntários em diversas cidades para a retirada de lixo das margens de rios e praias.",
                    "Noticia": "A iniciativa busca restaurar manguezais degradados na costa nordestina do Brasil,\n mobilizando doações e voluntários locais.\n A ONG Verde para Todos está à frente do projeto,\n que também conta com parcerias de outras ONGs e empresas privadas comprometidas com a responsabilidade social.\n O projeto visa não apenas a recuperação ambiental,\n mas também a educação e conscientização das comunidades locais.\n Workshops e treinamentos serão oferecidos para capacitar os voluntários.\n A iniciativa já recebeu apoio significativo de empresas do setor de turismo.\n Espera-se que o projeto sirva de modelo para outras regiões do país,\n promovendo a sustentabilidade e a preservação dos ecossistemas costeiros."
                }
            ],
            "TopNoticia3": [
                {
                    id: "TP3",
                    "Titulo": "ONG Lança Programa de Apoio Psicológico para Jovens em Situação de Vulnerabilidade",
                    "ResumoNoticia": "A ONG Caminhos para o Futuro lançou um projeto voltado para o suporte emocional de jovens em situação de vulnerabilidade.",
                    "Noticia": "A iniciativa busca restaurar manguezais degradados na costa nordestina do Brasil,\n mobilizando doações e voluntários locais.\n A ONG Verde para Todos está à frente do projeto,\n que também conta com parcerias de outras ONGs e empresas privadas comprometidas com a responsabilidade social.\n O projeto visa não apenas a recuperação ambiental,\n mas também a educação e conscientização das comunidades locais.\n Workshops e treinamentos serão oferecidos para capacitar os voluntários.\n A iniciativa já recebeu apoio significativo de empresas do setor de turismo.\n Espera-se que o projeto sirva de modelo para outras regiões do país,\n promovendo a sustentabilidade e a preservação dos ecossistemas costeiros."
                }
             
            ],
            "Noticia1": [
                {
                    id: "T1",
                    "Titulo": "Iniciativa Social Promove Inclusão Econômica de Mulheres em Vulnerabilidade",
                    "ResumoNoticia": "ONG Mulheres em Ação anunciou a abertura de 200 novas vagas em cursos de capacitação para mulheres em situação de vulnerabilidade em São Paulo.",
                    "Noticia": "Os cursos oferecidos abrangem diversas áreas, incluindo tecnologia, empreendedorismo, e habilidades manuais, com o objetivo de proporcionar às participantes as ferramentas necessárias para alcançar a independência financeira e melhorar suas condições de vida. Além da formação técnica, a ONG também oferece suporte psicológico e orientação profissional, criando um ambiente acolhedor e de apoio para que as mulheres possam desenvolver todo o seu potencial. A presidente da ONG, Maria Silva, destacou a importância da iniciativa: 'Nosso objetivo é empoderar essas mulheres, oferecendo-lhes oportunidades reais de crescimento e desenvolvimento. Acreditamos que, ao investir na capacitação dessas mulheres, estamos contribuindo para a construção de uma sociedade mais justa e igualitária.' As inscrições para os cursos já estão abertas e podem ser realizadas através do site oficial da ONG. As interessadas devem preencher um formulário online e aguardar a confirmação da vaga. A seleção será feita com base em critérios de vulnerabilidade social e econômica, garantindo que as vagas sejam destinadas às mulheres que mais necessitam desse apoio. Com essa iniciativa, a ONG Mulheres em Ação espera impactar positivamente a vida de centenas de mulheres, promovendo a inclusão econômica e social e fortalecendo a comunidade como um todo."
                }
            ],
             "Noticia2": [
                {
                    id: "T2",
                    "Titulo": "Projeto Inovador Restaura Ecossistemas Costeiros Ameaçados no Nordeste",
                    "ResumoNoticia": "Uma nova iniciativa da ONG Verde para Todos foi lançada esta semana, com o objetivo de recuperar manguezais degradados na costa nordestina do Brasil.",
                    "Noticia": "A iniciativa busca restaurar manguezais degradados na costa nordestina do Brasil, mobilizando doações e voluntários locais. A ONG Verde para Todos está à frente do projeto, que também conta com parcerias de outras ONGs e empresas privadas comprometidas com a responsabilidade social."
                }
            ],
            "Noticia3": [
                {
                    id: "T3",
                    "Titulo": "Campanha Humanitária Arrecada Fundos para Combater a Fome em Áreas Afetadas pela Crise Climática",
                    "ResumoNoticia": "A ONG internacional Aliança Global Contra a Fome lançou uma campanha de emergência para arrecadar fundos destinados a apoiar comunidades em países africanos severamente afetados pela crise climática.",
                    "Noticia": "A campanha visa fornecer alimentos, água potável e assistência médica às populações mais vulneráveis, além de promover a resiliência dessas comunidades através de projetos de agricultura sustentável e infraestrutura hídrica."
                }
            ],
            "Noticia4": [
                {
                    id: "T4",
                    "Titulo": "O Impacto das ONGs na Sociedade Moderna",
                    "ResumoNoticia": "As Organizações Não Governamentais (ONGs) desempenham um papel crucial na sociedade contemporânea. Elas atuam em diversas áreas, como direitos humanos, meio ambiente, saúde, educação e desenvolvimento comunitário.",
                    "Noticia": "As ONGs são pioneiras em identificar e abordar problemas sociais, promovendo igualdade de gênero, combate à pobreza e proteção ambiental. Elas também fornecem ajuda humanitária em emergências e promovem transparência e responsabilidade, além de desenvolver projetos sustentáveis em comunidades locais."
                }
            ] 
        } 
    ]
    // Função para carregar e preencher os dados do JSON
    function carregarConteudo() {
        // Iterar pelas categorias de notícias
        noticias.forEach((categoria) => {
            for (let chave in categoria) {
                // Iterar pelas notícias dentro de cada chave
                categoria[chave].forEach((noticia) => {
                    // Localizar o elemento pelo ID
                    const container = document.getElementById(noticia.id);

                    if (container) {
                        // Preencher o título
                        const titulo = container.querySelector('h2, h3, .tituloOutros, #tituloP,box1,box2');
                        if (titulo) {
                            titulo.textContent = noticia.Titulo;
                        }
                        // Preencher o resumo
                        const resumo = container.querySelector('p, .outrasN, #textoP');
                        if (resumo) {
                            resumo.textContent = noticia.ResumoNoticia;
                        }
                    } else {
                        console.warn(`Elemento com ID '${noticia.id}' não encontrado no DOM.`);
                    }
                });
            }
        });
    }

    // Chama a função ao carregar a página
    carregarConteudo();
});
    