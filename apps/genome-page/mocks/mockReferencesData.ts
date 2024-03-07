import { PublicationWithGene, Gene } from "dicty-graphql-schema"

const mockReferencesData: PublicationWithGene[] = [
  {
    related_genes: [] as Array<Gene>,
    id: "17968",
    authors: [
      { last_name: "Kamprad", first_name: "", initials: "", rank: "" },
      { last_name: "Witt", first_name: "", initials: "", rank: "" },
      { last_name: "Schroder", first_name: "", initials: "", rank: "" },
      { last_name: "Kreis", first_name: "", initials: "", rank: "" },
      { last_name: "Baumchen", first_name: "", initials: "", rank: "" },
      { last_name: "Janshoff", first_name: "", initials: "", rank: "" },
      { last_name: "Tarantola", first_name: "", initials: "", rank: "" },
    ],
    title:
      "Adhesion strategies of Dictyostelium discoideum - a force spectroscopy study.",
    journal: "Nanoscale",
    pages: ":",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "", name: "carA-1" } as Gene,
      { id: "", name: "sibA" } as Gene,
      { id: "", name: "carA-2" } as Gene,
      { id: "", name: "talA" } as Gene,
    ],
    id: "14229",
    authors: [
      { last_name: "Tarantola", first_name: "", initials: "", rank: "" },
      { last_name: "Bae", first_name: "", initials: "", rank: "" },
      { last_name: "Fuller", first_name: "", initials: "", rank: "" },
      { last_name: "Bodenschatz", first_name: "", initials: "", rank: "" },
      { last_name: "Rappel", first_name: "", initials: "", rank: "" },
      { last_name: "Loomis", first_name: "", initials: "", rank: "" },
    ],
    title:
      "Cell Substratum Adhesion during Early Development of Dictyostelium discoideum.",
    journal: "PLoS ONE",
    pages: "9:e106574",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0285793", name: "cadA" } as Gene,
      { id: "DDB_G0277143", name: "gpbA" } as Gene,
      { id: "DDB_G0274109", name: "paxB" } as Gene,
      { id: "DDB_G0284469", name: "gpaH" } as Gene,
      { id: "DDB_G0280531", name: "tgrC1" } as Gene,
      { id: "DDB_G0289073", name: "csaA" } as Gene,
    ],
    id: "13217",
    authors: [
      { last_name: "Wu", first_name: "", initials: "", rank: "" },
      { last_name: "Janetopoulos", first_name: "", initials: "", rank: "" },
    ],
    title:
      "The G alpha subunit G?8 inhibits proliferation, promotes adhesion and regulates cell differentiation.",
    journal: "Dev. Biol.",
    pages: ":",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0267444", name: "phg1A" } as Gene,
      { id: "DDB_G0290481", name: "talA" } as Gene,
      { id: "DDB_G0283699", name: "phg2" } as Gene,
      { id: "DDB_G0277273", name: "phg1B" } as Gene,
      { id: "DDB_G0287363", name: "sibA" } as Gene,
    ],
    id: "11946",
    authors: [
      { last_name: "Froquet", first_name: "", initials: "", rank: "" },
      { last_name: "le Coadic", first_name: "", initials: "", rank: "" },
      { last_name: "Perrin", first_name: "", initials: "", rank: "" },
      { last_name: "Cherix", first_name: "", initials: "", rank: "" },
      { last_name: "Cornillon", first_name: "", initials: "", rank: "" },
      { last_name: "Cosson", first_name: "", initials: "", rank: "" },
    ],
    title:
      "TM9/Phg1 and SadA proteins control surface expression and stability of SibA adhesion molecules in Dictyostelium.",
    journal: "Molecular biology of the cell",
    pages: ":",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0273737", name: "cak1-2" } as Gene,
      { id: "DDB_G0294491", name: "trxB" } as Gene,
      { id: "DDB_G0276885", name: "casK" } as Gene,
      { id: "DDB_G0276893", name: "ctxB" } as Gene,
      { id: "DDB_G0273251", name: "fpaB-1" } as Gene,
      { id: "DDB_G0272112", name: "myoJ" } as Gene,
      { id: "DDB_G0277399", name: "piaA" } as Gene,
    ],
    id: "11864",
    authors: [
      { last_name: "Journet", first_name: "", initials: "", rank: "" },
      { last_name: "Klein", first_name: "", initials: "", rank: "" },
      { last_name: "Brugiere", first_name: "", initials: "", rank: "" },
      { last_name: "Vandenbrouck", first_name: "", initials: "", rank: "" },
      { last_name: "Chapel", first_name: "", initials: "", rank: "" },
      { last_name: "Kieffer", first_name: "", initials: "", rank: "" },
      { last_name: "Bruley", first_name: "", initials: "", rank: "" },
      { last_name: "Masselon", first_name: "", initials: "", rank: "" },
      { last_name: "Aubry", first_name: "", initials: "", rank: "" },
    ],
    title:
      "Investigating the macropinocytic proteome of Dictyostelium amoebae by high-resolution mass spectrometry.",
    journal: "Proteomics",
    pages: ":",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [{ id: "DDB_G0289483", name: "ctxA" } as Gene],
    id: "12499361",
    authors: [
      { last_name: "Kowal", first_name: "", initials: "", rank: "" },
      { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
    ],
    title:
      "Uncovering a role for the Dictyostelium discoideum SadA protein in cell-substrate adhesion: A Role for the Tail.",
    journal: "Eukaryotic cell",
    pages: ":",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0268632", name: "abpA" } as Gene,
      { id: "DDB_G0290481", name: "talA" } as Gene,
      { id: "DDB_G0286355", name: "mhcA" } as Gene,
      { id: "DDB_G0287363", name: "sibA" } as Gene,
      { id: "DDB_G0277859", name: "mlcE" } as Gene,
      { id: "DDB_G0287505", name: "talB" } as Gene,
      { id: "DDB_G0276077", name: "mlcR" } as Gene,
    ],
    id: "11404",
    authors: [
      { last_name: "Tsujioka", first_name: "", initials: "", rank: "" },
    ],
    title: "Cell migration in multicellular environments.",
    journal: "Dev. Growth Differ.",
    pages: "53:528-37",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0287363", name: "sibA" } as Gene,
      { id: "DDB_G0288877", name: "aarA" } as Gene,
      { id: "DDB_G0289073", name: "csaA" } as Gene,
      { id: "DDB_G0267412", name: "pspA" } as Gene,
      { id: "DDB_G0285793", name: "cadA" } as Gene,
      { id: "DDB_G0280531", name: "tgrC1" } as Gene,
    ],
    id: "236",
    authors: [
      { last_name: "Abedin", first_name: "", initials: "", rank: "" },
      { last_name: "King", first_name: "", initials: "", rank: "" },
    ],
    title: "Diverse evolutionary paths to cell adhesion.",
    journal: "Trends Cell Biol",
    pages: "20:734-42",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0281547", name: "amyA" } as Gene,
      { id: "DDB_G0281551", name: "guaA" } as Gene,
      { id: "DDB_G0281663", name: "aprA" } as Gene,
      { id: "DDB_G0281811", name: "DDB_G0281811" } as Gene,
      { id: "DDB_G0286637", name: "DDB_G0286637" } as Gene,
      { id: "DDB_G0286725", name: "vps13A" } as Gene,
      { id: "DDB_G0286729", name: "DDB_G0286729" } as Gene,
    ],
    id: "445",
    authors: [
      { last_name: "Sillo", first_name: "", initials: "", rank: "" },
      { last_name: "Bloomfield", first_name: "", initials: "", rank: "" },
      { last_name: "Balest", first_name: "", initials: "", rank: "" },
      { last_name: "Balbo", first_name: "", initials: "", rank: "" },
      { last_name: "Pergolizzi", first_name: "", initials: "", rank: "" },
      { last_name: "Peracino", first_name: "", initials: "", rank: "" },
      { last_name: "Skelton", first_name: "", initials: "", rank: "" },
      { last_name: "Ivens", first_name: "", initials: "", rank: "" },
      { last_name: "Bozzaro", first_name: "", initials: "", rank: "" },
    ],
    title:
      "Genome-wide transcriptional changes induced by phagocytosis or growth on bacteria in Dictyostelium.",
    journal: "BMC Genomics",
    pages: "9:291",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0287363", name: "sibA" } as Gene,
      { id: "DDB_G0267400", name: "hspD" } as Gene,
      { id: "DDB_G0267406", name: "ImpA" } as Gene,
      { id: "DDB_G0267444", name: "phg1A" } as Gene,
      { id: "DDB_G0290965", name: "trafM" } as Gene,
      { id: "DDB_G0292322", name: "DDB_G0292322" } as Gene,
    ],
    id: "459",
    authors: [
      { last_name: "Cosson", first_name: "", initials: "", rank: "" },
      { last_name: "Soldati", first_name: "", initials: "", rank: "" },
    ],
    title: "Eat, kill or die: when amoeba meets bacteria.",
    journal: "Curr Opin Microbiol",
    pages: "11:271-6",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0287035", name: "ImpB" } as Gene,
      { id: "DDB_G0287125", name: "proA" } as Gene,
      { id: "DDB_G0287127", name: "vatA" } as Gene,
      { id: "DDB_G0287363", name: "sibA" } as Gene,
      { id: "DDB_G0287733", name: "syn7A" } as Gene,
      { id: "DDB_G0288319", name: "arcE" } as Gene,
    ],
    id: "608",
    authors: [
      { last_name: "Bozzaro", first_name: "", initials: "", rank: "" },
      { last_name: "Bucci", first_name: "", initials: "", rank: "" },
      { last_name: "Steinert", first_name: "", initials: "", rank: "" },
    ],
    title:
      "Phagocytosis and host-pathogen interactions in Dictyostelium with a look at macrophages.",
    journal: "Int Rev Cell Mol Biol",
    pages: "271:253-300",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0276267", name: "gpaB" } as Gene,
      { id: "DDB_G0290481", name: "talA" } as Gene,
      { id: "DDB_G0283539", name: "crtA" } as Gene,
      { id: "DDB_G0283605", name: "yakA" } as Gene,
      { id: "DDB_G0273397", name: "carA-1" } as Gene,
      { id: "DDB_G0273533", name: "carA-2" } as Gene,
    ],
    id: "757",
    authors: [
      { last_name: "Katoh", first_name: "", initials: "", rank: "" },
      { last_name: "Chen", first_name: "", initials: "", rank: "" },
      { last_name: "Roberge", first_name: "", initials: "", rank: "" },
      { last_name: "Shaulsky", first_name: "", initials: "", rank: "" },
      { last_name: "Kuspa", first_name: "", initials: "", rank: "" },
    ],
    title: "Developmental commitment in Dictyostelium discoideum.",
    journal: "Eukaryot Cell",
    pages: "6:2038-45",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [
      { id: "DDB_G0288179", name: "carB" } as Gene,
      { id: "DDB_G0288877", name: "aarA" } as Gene,
      { id: "DDB_G0289073", name: "csaA" } as Gene,
      { id: "DDB_G0276027", name: "pdeE" } as Gene,
      { id: "DDB_G0281545", name: "acaA" } as Gene,
      { id: "DDB_G0293834", name: "wasA" } as Gene,
    ],
    id: "1732",
    authors: [
      { last_name: "Williams", first_name: "", initials: "", rank: "" },
      { last_name: "Harwood", first_name: "", initials: "", rank: "" },
    ],
    title: "Cell polarity and Dictyostelium development.",
    journal: "Curr Opin Microbiol",
    pages: "6:621-7",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
  {
    related_genes: [] as Array<Gene>,
    id: "12499361",
    authors: [
      { last_name: "Fey", first_name: "", initials: "", rank: "" },
      { last_name: "Stephens", first_name: "", initials: "", rank: "" },
      { last_name: "Titus", first_name: "", initials: "", rank: "" },
      { last_name: "Chisholm", first_name: "", initials: "", rank: "" },
    ],
    title: "SadA, a novel adhesion receptor in Dictyostelium.",
    journal: "J Cell Biol",
    pages: "159:1109-19",
    abstract: "",
    pub_type: "",
    source: "",
    doi: "",
    pub_date: "",
    volume: "",
    issn: "",
    issue: "",
    status: "",
  } as PublicationWithGene,
]

export { mockReferencesData }
