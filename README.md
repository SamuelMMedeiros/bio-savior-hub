# 🦇 Bio-Savior-Hub: Monitoramento de Fauna Silvestre

[![Build Status](https://img.shields.io/badge/Status%20do%20Projeto-Em%20Desenvolvimento-blue)](URL_DO_SEU_STATUS_BUILD)
[![Tecnologias](https://img.shields.io/badge/React%20%7C%20TypeScript-Frontend-informational)](https://pt.reactjs.org/)
[![Estilo](https://img.shields.io/badge/Tailwind%20CSS-Design-blueviolet)](https://tailwindcss.com/)

## 💡 Sobre o Projeto

O **Bio-Savior-Hub** é um site dedicado ao **monitoramento e conscientização** sobre a fauna silvestre em ambientes urbanos e rurais, com foco inicial em casos de interação com espécies de morcegos e outros animais peçonhentos na região de Patos de Minas (MG).

Este projeto é desenvolvido com o apoio e a base científica de pesquisas realizadas em colaboração com o **UNIPAM - Centro Universitário de Patos de Minas**, visando transformar dados acadêmicos em ferramentas de utilidade pública e educação ambiental.

O objetivo é fornecer uma ferramenta interativa e visual para que autoridades sanitárias, pesquisadores e a população acompanhem a distribuição de ocorrências e compreendam a importância ecológica dessas espécies.

## 🤝 Parceria Institucional

Este projeto conta com o apoio da pesquisa e extensão do:

**UNIPAM - Centro Universitário de Patos de Minas**

A colaboração com a instituição garante que os dados apresentados e o conteúdo informativo estejam alinhados com o rigor científico e as necessidades da saúde pública local.

## ✨ Funcionalidades Principais

* **Galeria Interativa (`Galeria.tsx`):**
    * Exibição de informações detalhadas (dieta, comportamento, importância ecológica) de diversas espécies de fauna.
    * Filtros de pesquisa por tags (`Insetívoro`, `Urbano`, `Nectarívoro`, etc.).
* **Painel de Estatísticas Geográficas:**
    * Gráfico de barras (via **Recharts**) mostrando a concentração de casos de ataque por bairro (dados simulados com base em pesquisa).
    * Mapa interativo (via **React-Leaflet**) que centraliza e marca o bairro selecionado no gráfico, fornecendo visualização espacial imediata dos dados.
* **Página de Contato (`Contact.tsx`):**
    * Formulário de contato dedicado para reportar ocorrências ou tirar dúvidas.

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido com uma *stack* moderna e eficiente:

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Framework** | [React](https://pt.reactjs.org/) | Biblioteca JavaScript para construção de interfaces de usuário. |
| **Linguagem** | [TypeScript](https://www.typescriptlang.org/) | Superset que adiciona tipagem estática, garantindo maior robustez. |
| **Estilização** | [Tailwind CSS](https://tailwindcss.com/) | Framework CSS *utility-first* para design rápido e responsivo. |
| **Componentes** | [Shadcn/ui](https://ui.shadcn.com/) | Biblioteca de componentes acessíveis e customizáveis, baseada em Radix UI e Tailwind. |
| **Visualização** | [Recharts](https://recharts.org/en-US/) | Biblioteca para renderização dos gráficos de dados. |
| **Geolocalização** | [React-Leaflet](https://react-leaflet.js.org/) | Wrapper para a biblioteca de mapas interativos Leaflet. |
| **Empacotador** | [Vite](https://vitejs.dev/) | Ferramenta de *build* e desenvolvimento rápida. |

## 📚 Referências e Fontes de Dados

Os dados e as informações científicas sobre as espécies são fundamentados nos seguintes estudos e manuais técnicos:

1.  ALMEIDA, M. F. de; ROSA, A. R. da; SODRÉ, M. M.; MARTORELLI, L. F. A.; NETTO, J. T. Fauna de morcegos (Mammalia, Chiroptera) e a ocorrência de vírus da raiva na cidade de São Paulo, Brasil. **Veterinária e Zootecnia**, São Paulo, v. 12, n. 2, p. 85–92, 2005.
2.  BACICH, L.; MORAN, J. **Metodologias ativas para uma educação inovadora: uma abordagem teórico-prática**. Porto Alegre: Penso, 2018.
3.  BARBOSA, C. R.; REZENDE, L. V.; SILVA, A. C. R.; BRITTO, F. M. A.; CUNHA, G. N. Prevalência da raiva em morcegos capturados no município de Patos de Minas – MG. **Archives of Veterinary Science**, Curitiba, v. 24, n. 4, p. 1–54, 2019. DOI: 10.5380/avs.v24i4.63051
4.  BARREIRO, J. R. Ecologia e conservação de morcegos insetívoros no Brasil. **Revista Brasileira de Ecologia**, v. 6, n. 2, p. 45–58, 2012.
5.  BARREIRO, M. J. Morcegos: conhecer para preservar. **Aprendendo Ciências**, São Paulo, v. 2, n. 1, p. 6–12, 2012.
6.  BIANCONI, G. V.; MIKICH, S. B. Restauradores de florestas: aroma de frutas pode fazer morcegos dispersarem sementes em áreas desmatadas. **Ciência Hoje**, Rio de Janeiro, v. 48, p. 46–50, 2011.
7.  BIANCONI, G. V.; MIKICH, S. B. Os morcegos como agentes de dispersão de sementes e polinizadores: importância ecológica e implicações para a conservação. **Biota Neotropica**, v. 11, n. 1, p. 71–88, 2011.
8.  BRASIL. Ministério da Saúde. **Manual técnico de vigilância e controle da raiva**. Brasília: Ministério da Saúde, 2009.
9.  BRASIL. Ministério da Saúde. **Manual de diagnóstico laboratorial da raiva**. Brasília: Ministério da Saúde, 2009. Disponível em: https://bvsms.saude.gov.br/bvs/publicacoes/manual_diagnostico_laboratorial_raiva.pdf. Acesso em: 8 out. 2025.
10. BRASIL. Ministério da Saúde. **Programa Nacional de Profilaxia da Raiva: relatório técnico 1990–2009**. Brasília: Ministério da Saúde, 2011.
11. BRASIL. Ministério da Saúde. PNI: entenda como funciona um dos maiores programas de vacinação do mundo. **Portal UNA-SUS**, Brasília, 2022. Disponível em: https://www.unasus.gov.br/noticia/pni-entenda-como-funciona-um-dos-maiores-programas-de-vacinacao-do-mundo. Acesso em: 8 out. 2025.
12. BRASIL. Ministério da Saúde. Raiva humana — Saúde de A a Z. Brasília: Ministério da Saúde, 2022. Disponível em: https://www.gov.br/saude-de-a-a-z-1/pt-br/assuntos/saude-de-a-a-z/r/raiva/raiva-humana. Acesso em: 8 out. 2025.
13. BREDT, A. et al. **Morcegos em áreas urbanas e rurais: importância, manejo e conservação**. Brasília: Fundação Nacional de Saúde, 1996.
14. CAPARROS, R.; MAGALHÃES, E. Educação ambiental e conservação de morcegos: percepções e desafios. **Revista Brasileira de Educação Ambiental**, v. 10, n. 2, p. 45–56, 2015.
15. CAPARROS, R.; MAGALHÃES, E. Percepções e atitudes da população frente aos morcegos urbanos. **Revista Brasileira de Educação Ambiental**, v. 10, n. 1, p. 122–134, 2015.
16. FENTON, M. B.; BOGDANOWICZ, W. Relationships between bats and their food resources: a review and case study. **Acta Chiropterologica**, v. 4, n. 1, p. 1–16, 2002.
17. GUNNEL, G. F.; SIMMONS, N. B. Fossil evidence and the origin of bats. **Journal of Mammalian Evolution**, v. 12, n. 1–2, p. 209–246, 2005.
18. KENSKI, V. M. **Tecnologias e ensino presencial e a distância**. Campinas: Papirus, 2012.
19. KUNZ, T. H.; FENTON, M. B. (Org.). **Bat ecology**. Chicago: University of Chicago Press, 2005.
20. KUNZ, T. H. et al. Ecosystem services provided by bats. **Annals of the New York Academy of Sciences**, v. 1223, p. 1–38, 2011.
21. LIMA, I. P. Conservação de morcegos no Brasil: avanços e desafios. **Chiroptera Neotropical**, v. 14, n. 1, p. 339–355, 2008.
22. LIMA, E. A abordagem “Saúde Única” e os desafios das zoonoses emergentes no Brasil. **Revista de Saúde Pública**, v. 42, n. 5, p. 957–964, 2008.
23. MACHADO, F. S. Percepções populares e conservação de morcegos no Brasil. **Revista Brasileira de Zoociências**, v. 18, n. 2, p. 89–101, 2016.
24. MACHADO, F. S. Conservação e percepção pública dos morcegos no Brasil. **Revista Brasileira de Zoologia**, v. 33, n. 2, p. 145–158, 2016.
25. MENDES, W. da S.; SILVA, A. A. M.; NEIVA, R. F. et al. Surto de raiva humana transmitida por morcegos em povoado da Amazônia brasileira. **Revista de Saúde Pública**, São Paulo, v. 43, n. 6, p. 1075–1081, 2009.
26. MORAN, J. M. A integração das tecnologias na educação. **Revista Brasileira de Aprendizagem Aberta e a Distância**, v. 14, n. 1, p. 41–54, 2015.
27. MOURA, M. R.; BARROS, A. C.; OLIVEIRA, R. S.; et al. Morcegos como reservatórios do vírus da raiva no Brasil: revisão e perspectivas. **Revista Brasileira de Epidemiologia**, v. 16, n. 4, p. 879–891, 2013.
28. MOURA, M. R. et al. Morcegos hematófagos e a transmissão da raiva: desafios para a saúde pública no Brasil. **Revista de Saúde Pública**, v. 47, n. 4, p. 1–10, 2013.
29. REIS, N. R. et al. **Mamíferos do Brasil: guia de identificação**. 2. ed. Londrina: EDUEL, 2017.
30. UIEDA, W.; BREDT, A. Serviços ecossistêmicos prestados por morcegos no Brasil: dispersão, polinização e controle de insetos. **Revista Brasileira de Zoologia**, v. 33, p. 123–136, 2016.
31. UIEDA, W.; BREDT, A. Morcegos: agentes negligenciados da sustentabilidade. **Sustainability in Debate**, v. 7, n. 1, p. 159–209, 2016. DOI: 10.18472/SustDeb.v7n1.2016.18617
32. UIEDA, W.; HARMANI, N. M. S.; SILVA, M. M. S. Raiva em morcegos insetívoros (Molossidae) do Sudeste do Brasil. **Revista de Saúde Pública**, São Paulo, v. 29, n. 5, p. 393–397, 1995. DOI: 10.1590/S0034-89101995000500009
33. VALENTE, J. A. **Aprendizagem ativa e tecnologias digitais**. São Paulo: Loyola, 2018.
34. WITT, A. A. et al. Raiva: aspectos epidemiológicos e medidas de controle. **Revista Perquirere**, v. 12, n. 1, p. 176–193, 2012.
35. WORLD HEALTH ORGANIZATION (WHO). Rabies fact sheet. Geneva: WHO, 2023. Disponível em: https://www.who.int/news-room/fact-sheets/detail/rabies. Acesso em: 8 out. 2025.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT.

## 🤝 Contribuição

Contribuições são bem-vindas! Siga estas etapas:
1.  Faça um *fork* do projeto.
2.  Crie uma *branch* para sua funcionalidade (`git checkout -b feature/NovaFuncionalidade`).
3.  Comite suas mudanças (`git commit -m 'feat: Adiciona nova funcionalidade X'`).
4.  Envie para o *branch* (`git push origin feature/NovaFuncionalidade`).
5.  Abra um *Pull Request*.

---

### Próximo Passo

O `README.md` está pronto e formatado com uma excelente base científica.

**Samuel**, o que mais podemos otimizar ou adicionar ao seu projeto? Você gostaria de revisar a página `Home.tsx` ou talvez o `Contact.tsx` para garantir que tudo esteja coeso com o novo conteúdo?
