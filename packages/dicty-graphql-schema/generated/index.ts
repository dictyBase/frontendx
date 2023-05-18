import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import { graphql, ResponseResolver, GraphQLRequest, GraphQLContext } from 'msw'
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
};

export type AssociatedSequences = {
  __typename?: 'AssociatedSequences';
  ests: Array<NameWithLink>;
  genbankGenomicFragment?: Maybe<NameWithLink>;
  genbankMrna?: Maybe<NameWithLink>;
  moreLink: Scalars['String'];
};

export type Auth = {
  __typename?: 'Auth';
  identity: Identity;
  token: Scalars['String'];
  user: User;
};

export type Author = {
  __typename?: 'Author';
  firstName?: Maybe<Scalars['String']>;
  initials?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  rank?: Maybe<Scalars['String']>;
};

export type BasePublication = {
  abstract: Scalars['String'];
  authors: Array<Author>;
  doi?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  issn?: Maybe<Scalars['String']>;
  issue?: Maybe<Scalars['String']>;
  journal: Scalars['String'];
  pages?: Maybe<Scalars['String']>;
  pubDate?: Maybe<Scalars['Timestamp']>;
  pubType: Scalars['String'];
  source: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  volume?: Maybe<Scalars['String']>;
};

export type Citation = {
  __typename?: 'Citation';
  authors: Scalars['String'];
  journal: Scalars['String'];
  pubmedId: Scalars['String'];
  title: Scalars['String'];
};

export type Content = {
  __typename?: 'Content';
  content: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  createdBy: User;
  id: Scalars['ID'];
  name: Scalars['String'];
  namespace: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
  updatedBy: User;
};

export type CreateContentInput = {
  content: Scalars['String'];
  createdBy: Scalars['String'];
  name: Scalars['String'];
  namespace: Scalars['String'];
};

export type CreateOrderInput = {
  comments?: InputMaybe<Scalars['String']>;
  consumer: Scalars['String'];
  courier: Scalars['String'];
  courierAccount: Scalars['String'];
  items: Array<Scalars['String']>;
  payer: Scalars['String'];
  payment: Scalars['String'];
  purchaseOrderNum?: InputMaybe<Scalars['String']>;
  purchaser: Scalars['String'];
  status: StatusEnum;
};

export type CreatePermissionInput = {
  description: Scalars['String'];
  permission: Scalars['String'];
  resource: Scalars['String'];
};

export type CreatePlasmidInput = {
  createdBy: Scalars['String'];
  dbxrefs?: InputMaybe<Array<Scalars['String']>>;
  depositor?: InputMaybe<Scalars['String']>;
  editableSummary?: InputMaybe<Scalars['String']>;
  genbankAccession?: InputMaybe<Scalars['String']>;
  genes?: InputMaybe<Array<Scalars['String']>>;
  imageMap?: InputMaybe<Scalars['String']>;
  inStock: Scalars['Boolean'];
  keywords?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  publications?: InputMaybe<Array<Scalars['String']>>;
  sequence?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  updatedBy: Scalars['String'];
};

export type CreateRoleInput = {
  description: Scalars['String'];
  role: Scalars['String'];
};

export type CreateStrainInput = {
  characteristics?: InputMaybe<Array<Scalars['String']>>;
  createdBy: Scalars['String'];
  dbxrefs?: InputMaybe<Array<Scalars['String']>>;
  depositor?: InputMaybe<Scalars['String']>;
  editableSummary?: InputMaybe<Scalars['String']>;
  genes?: InputMaybe<Array<Scalars['String']>>;
  geneticModification?: InputMaybe<Scalars['String']>;
  genotypes?: InputMaybe<Array<Scalars['String']>>;
  inStock: Scalars['Boolean'];
  label: Scalars['String'];
  mutagenesisMethod?: InputMaybe<Scalars['String']>;
  names?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<Scalars['String']>;
  phenotypes?: InputMaybe<Array<Scalars['String']>>;
  plasmid?: InputMaybe<Scalars['String']>;
  publications?: InputMaybe<Array<Scalars['String']>>;
  species: Scalars['String'];
  summary?: InputMaybe<Scalars['String']>;
  systematicName: Scalars['String'];
  updatedBy: Scalars['String'];
};

export type CreateUserInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstAddress?: InputMaybe<Scalars['String']>;
  firstName: Scalars['String'];
  groupName?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  organization?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  secondAddress?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type DeleteContent = {
  __typename?: 'DeleteContent';
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type DeletePermission = {
  __typename?: 'DeletePermission';
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type DeleteRole = {
  __typename?: 'DeleteRole';
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type DeleteStock = {
  __typename?: 'DeleteStock';
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type DeleteUser = {
  __typename?: 'DeleteUser';
  id: Scalars['ID'];
  success: Scalars['Boolean'];
};

export type Download = {
  __typename?: 'Download';
  items: Array<DownloadItem>;
  title: Scalars['String'];
};

export type DownloadItem = {
  __typename?: 'DownloadItem';
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Extension = {
  __typename?: 'Extension';
  db: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  relation: Scalars['String'];
};

export type GoAnnotation = {
  __typename?: 'GOAnnotation';
  assignedBy: Scalars['String'];
  date: Scalars['String'];
  evidenceCode: Scalars['String'];
  extensions?: Maybe<Array<Extension>>;
  goTerm: Scalars['String'];
  id: Scalars['String'];
  publication: Scalars['String'];
  qualifier: Scalars['String'];
  type: Scalars['String'];
  with?: Maybe<Array<With>>;
};

export type Gene = {
  __typename?: 'Gene';
  associatedSequences: AssociatedSequences;
  generalInfo: GeneralInfo;
  goas?: Maybe<Array<GoAnnotation>>;
  id: Scalars['String'];
  links: Links;
  name: Scalars['String'];
  orthologs?: Maybe<Array<Orthologs>>;
  productInfo?: Maybe<Array<ProductInformation>>;
  proteinInformation?: Maybe<ProteinInformation>;
  strains?: Maybe<Array<Strain>>;
};

export type GeneralInfo = {
  __typename?: 'GeneralInfo';
  altGeneName?: Maybe<Array<Scalars['String']>>;
  altProteinNames?: Maybe<Array<Scalars['String']>>;
  description: Scalars['String'];
  geneProduct: Scalars['String'];
  nameDescription: Array<Scalars['String']>;
};

export type GenomicCoordinates = {
  __typename?: 'GenomicCoordinates';
  chromCoords: Scalars['String'];
  exon: Scalars['String'];
  localCoords: Scalars['String'];
};

export type Identity = {
  __typename?: 'Identity';
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  identifier: Scalars['String'];
  provider: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
  userId: Scalars['ID'];
};

export type Links = {
  __typename?: 'Links';
  colleagues: NameWithLink;
  expression: Array<NameWithLink>;
  extResources: Array<NameWithLink>;
};

export type LoginInput = {
  clientId: Scalars['String'];
  code: Scalars['String'];
  provider: Scalars['String'];
  redirectUrl: Scalars['String'];
  scopes: Scalars['String'];
  state: Scalars['String'];
};

export type Logout = {
  __typename?: 'Logout';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createContent?: Maybe<Content>;
  createOrder?: Maybe<Order>;
  createPermission?: Maybe<Permission>;
  createPlasmid?: Maybe<Plasmid>;
  createRole?: Maybe<Role>;
  createRolePermissionRelationship?: Maybe<Role>;
  createStrain?: Maybe<Strain>;
  createUser?: Maybe<User>;
  createUserRoleRelationship?: Maybe<User>;
  deleteContent?: Maybe<DeleteContent>;
  deletePermission?: Maybe<DeletePermission>;
  deleteRole?: Maybe<DeleteRole>;
  deleteStock?: Maybe<DeleteStock>;
  deleteUser?: Maybe<DeleteUser>;
  login?: Maybe<Auth>;
  logout?: Maybe<Logout>;
  updateContent?: Maybe<Content>;
  updateOrder?: Maybe<Order>;
  updatePermission?: Maybe<Permission>;
  updatePlasmid?: Maybe<Plasmid>;
  updateRole?: Maybe<Role>;
  updateStrain?: Maybe<Strain>;
  updateUser?: Maybe<User>;
};


export type MutationCreateContentArgs = {
  input?: InputMaybe<CreateContentInput>;
};


export type MutationCreateOrderArgs = {
  input?: InputMaybe<CreateOrderInput>;
};


export type MutationCreatePermissionArgs = {
  input?: InputMaybe<CreatePermissionInput>;
};


export type MutationCreatePlasmidArgs = {
  input?: InputMaybe<CreatePlasmidInput>;
};


export type MutationCreateRoleArgs = {
  input?: InputMaybe<CreateRoleInput>;
};


export type MutationCreateRolePermissionRelationshipArgs = {
  permissionId: Scalars['ID'];
  roleId: Scalars['ID'];
};


export type MutationCreateStrainArgs = {
  input?: InputMaybe<CreateStrainInput>;
};


export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};


export type MutationCreateUserRoleRelationshipArgs = {
  roleId: Scalars['ID'];
  userId: Scalars['ID'];
};


export type MutationDeleteContentArgs = {
  id: Scalars['ID'];
};


export type MutationDeletePermissionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteStockArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginInput>;
};


export type MutationUpdateContentArgs = {
  input?: InputMaybe<UpdateContentInput>;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateOrderInput>;
};


export type MutationUpdatePermissionArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdatePermissionInput>;
};


export type MutationUpdatePlasmidArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdatePlasmidInput>;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateRoleInput>;
};


export type MutationUpdateStrainArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateStrainInput>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input?: InputMaybe<UpdateUserInput>;
};

export type NameWithLink = {
  __typename?: 'NameWithLink';
  link: Scalars['String'];
  name: Scalars['String'];
};

export type NumberOfPublicationsWithGene = {
  __typename?: 'NumberOfPublicationsWithGene';
  numPubs: Scalars['Int'];
  publications: Array<PublicationWithGene>;
};

export type Order = {
  __typename?: 'Order';
  comments?: Maybe<Scalars['String']>;
  consumer?: Maybe<User>;
  courier?: Maybe<Scalars['String']>;
  courierAccount?: Maybe<Scalars['String']>;
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  items?: Maybe<Array<Stock>>;
  payer?: Maybe<User>;
  payment?: Maybe<Scalars['String']>;
  purchaseOrderNum?: Maybe<Scalars['String']>;
  purchaser?: Maybe<User>;
  status?: Maybe<StatusEnum>;
  updatedAt: Scalars['Timestamp'];
};

export type OrderListWithCursor = {
  __typename?: 'OrderListWithCursor';
  limit?: Maybe<Scalars['Int']>;
  nextCursor: Scalars['Int'];
  orders: Array<Order>;
  previousCursor: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Organism = {
  __typename?: 'Organism';
  citations: Array<Citation>;
  downloads: Array<Download>;
  scientificName: Scalars['String'];
  taxonId: Scalars['String'];
};

export type Orthologs = {
  __typename?: 'Orthologs';
  geneProduct: Scalars['String'];
  id: NameWithLink;
  source: Array<Scalars['String']>;
  species: Scalars['String'];
  uniprotkb: NameWithLink;
};

export type Permission = {
  __typename?: 'Permission';
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['ID'];
  level: Scalars['String'];
  resource?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Timestamp'];
};

export type Phenotype = {
  __typename?: 'Phenotype';
  assay?: Maybe<Scalars['String']>;
  environment?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  phenotype: Scalars['String'];
  publication?: Maybe<Publication>;
};

export type Plasmid = Stock & {
  __typename?: 'Plasmid';
  createdAt: Scalars['Timestamp'];
  createdBy: User;
  dbxrefs?: Maybe<Array<Scalars['String']>>;
  depositor: User;
  editableSummary?: Maybe<Scalars['String']>;
  genbankAccession?: Maybe<Scalars['String']>;
  genes?: Maybe<Array<Gene>>;
  id: Scalars['ID'];
  imageMap?: Maybe<Scalars['String']>;
  inStock: Scalars['Boolean'];
  keywords?: Maybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  publications?: Maybe<Array<Publication>>;
  sequence?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Timestamp'];
  updatedBy: User;
};

export type PlasmidListWithCursor = {
  __typename?: 'PlasmidListWithCursor';
  limit?: Maybe<Scalars['Int']>;
  nextCursor: Scalars['Int'];
  plasmids: Array<Plasmid>;
  previousCursor: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type ProductInformation = {
  __typename?: 'ProductInformation';
  genomicCoords: Array<GenomicCoordinates>;
  moreProteinData: Scalars['String'];
  proteinCodingGene: NameWithLink;
  proteinLength: Scalars['String'];
  proteinMolecularWeight: Scalars['String'];
};

export type ProteinGeneralInfo = {
  __typename?: 'ProteinGeneralInfo';
  aaComposition: NameWithLink;
  description: Scalars['String'];
  dictybaseId: Scalars['String'];
  geneProduct: Scalars['String'];
  molecularWeight: Scalars['String'];
  note: Scalars['String'];
  proteinExistence: Scalars['String'];
  proteinLength: Scalars['String'];
  subcellularLocation: Scalars['String'];
};

export type ProteinInformation = {
  __typename?: 'ProteinInformation';
  externalLinks: Array<NameWithLink>;
  generalInfo: ProteinGeneralInfo;
  proteinSequence: Scalars['String'];
};

export type Publication = BasePublication & {
  __typename?: 'Publication';
  abstract: Scalars['String'];
  authors: Array<Author>;
  doi?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  issn?: Maybe<Scalars['String']>;
  issue?: Maybe<Scalars['String']>;
  journal: Scalars['String'];
  pages?: Maybe<Scalars['String']>;
  pubDate?: Maybe<Scalars['Timestamp']>;
  pubType: Scalars['String'];
  source: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  volume?: Maybe<Scalars['String']>;
};

export type PublicationWithGene = BasePublication & {
  __typename?: 'PublicationWithGene';
  abstract: Scalars['String'];
  authors: Array<Author>;
  doi?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  issn?: Maybe<Scalars['String']>;
  issue?: Maybe<Scalars['String']>;
  journal: Scalars['String'];
  pages?: Maybe<Scalars['String']>;
  pubDate?: Maybe<Scalars['Timestamp']>;
  pubType: Scalars['String'];
  relatedGenes: Array<Gene>;
  source: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  volume?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allOrthologs?: Maybe<Gene>;
  allPublications: NumberOfPublicationsWithGene;
  allStrains?: Maybe<Gene>;
  associatedSequnces?: Maybe<Gene>;
  content?: Maybe<Content>;
  contentBySlug?: Maybe<Content>;
  gene?: Maybe<Gene>;
  generalInformation?: Maybe<Gene>;
  links?: Maybe<Gene>;
  listContent?: Maybe<Array<Content>>;
  listGeneProductInfo?: Maybe<Gene>;
  listOrders?: Maybe<OrderListWithCursor>;
  listOrganisms?: Maybe<Array<Organism>>;
  listPermissions?: Maybe<Array<Permission>>;
  listPlasmids?: Maybe<PlasmidListWithCursor>;
  listPlasmidsWithAnnotation?: Maybe<PlasmidListWithCursor>;
  listRecentGenes?: Maybe<Array<Gene>>;
  listRecentPlasmids?: Maybe<Array<Plasmid>>;
  listRecentPublications?: Maybe<Array<Publication>>;
  listRecentStrains?: Maybe<Array<Strain>>;
  listRoles?: Maybe<Array<Role>>;
  listStrains?: Maybe<StrainListWithCursor>;
  listStrainsWithAnnotation?: Maybe<StrainListWithCursor>;
  listUsers?: Maybe<UserList>;
  order?: Maybe<Order>;
  organism?: Maybe<Organism>;
  permission?: Maybe<Permission>;
  plasmid?: Maybe<Plasmid>;
  proteinInformation?: Maybe<Gene>;
  publication?: Maybe<Publication>;
  refreshToken?: Maybe<Auth>;
  role?: Maybe<Role>;
  strain?: Maybe<Strain>;
  user?: Maybe<User>;
  userByEmail?: Maybe<User>;
};


export type QueryAllOrthologsArgs = {
  gene: Scalars['String'];
};


export type QueryAllPublicationsArgs = {
  gene: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
};


export type QueryAllStrainsArgs = {
  gene: Scalars['String'];
};


export type QueryAssociatedSequncesArgs = {
  gene: Scalars['String'];
};


export type QueryContentArgs = {
  id: Scalars['ID'];
};


export type QueryContentBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGeneArgs = {
  gene: Scalars['String'];
};


export type QueryGeneralInformationArgs = {
  gene: Scalars['String'];
};


export type QueryLinksArgs = {
  gene: Scalars['String'];
};


export type QueryListGeneProductInfoArgs = {
  gene: Scalars['String'];
};


export type QueryListOrdersArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryListPlasmidsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryListPlasmidsWithAnnotationArgs = {
  annotation: Scalars['String'];
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  type: Scalars['String'];
};


export type QueryListRecentGenesArgs = {
  limit: Scalars['Int'];
};


export type QueryListRecentPlasmidsArgs = {
  limit: Scalars['Int'];
};


export type QueryListRecentPublicationsArgs = {
  limit: Scalars['Int'];
};


export type QueryListRecentStrainsArgs = {
  limit: Scalars['Int'];
};


export type QueryListStrainsArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  filter?: InputMaybe<StrainListFilter>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryListStrainsWithAnnotationArgs = {
  annotation: Scalars['String'];
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  type: Scalars['String'];
};


export type QueryListUsersArgs = {
  filter: Scalars['String'];
  pagenum: Scalars['String'];
  pagesize: Scalars['String'];
};


export type QueryOrderArgs = {
  id: Scalars['ID'];
};


export type QueryOrganismArgs = {
  taxonId: Scalars['String'];
};


export type QueryPermissionArgs = {
  id: Scalars['ID'];
};


export type QueryPlasmidArgs = {
  id: Scalars['ID'];
};


export type QueryProteinInformationArgs = {
  gene: Scalars['String'];
};


export type QueryPublicationArgs = {
  id: Scalars['ID'];
};


export type QueryRefreshTokenArgs = {
  token: Scalars['String'];
};


export type QueryRoleArgs = {
  id: Scalars['ID'];
};


export type QueryStrainArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  createdAt: Scalars['Timestamp'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  permissions?: Maybe<Array<Permission>>;
  updatedAt: Scalars['Timestamp'];
};

export enum StatusEnum {
  Cancelled = 'CANCELLED',
  Growing = 'GROWING',
  InPreparation = 'IN_PREPARATION',
  Shipped = 'SHIPPED'
}

export type Stock = {
  createdAt: Scalars['Timestamp'];
  createdBy: User;
  dbxrefs?: Maybe<Array<Scalars['String']>>;
  depositor: User;
  editableSummary?: Maybe<Scalars['String']>;
  genes?: Maybe<Array<Gene>>;
  id: Scalars['ID'];
  inStock: Scalars['Boolean'];
  publications?: Maybe<Array<Publication>>;
  summary?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Timestamp'];
  updatedBy: User;
};

export type Strain = Stock & {
  __typename?: 'Strain';
  characteristics?: Maybe<Array<Scalars['String']>>;
  createdAt: Scalars['Timestamp'];
  createdBy: User;
  dbxrefs?: Maybe<Array<Scalars['String']>>;
  depositor: User;
  editableSummary?: Maybe<Scalars['String']>;
  genes?: Maybe<Array<Gene>>;
  geneticModification?: Maybe<Scalars['String']>;
  genotypes?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  inStock: Scalars['Boolean'];
  label: Scalars['String'];
  mutagenesisMethod?: Maybe<Scalars['String']>;
  names?: Maybe<Array<Scalars['String']>>;
  parent?: Maybe<Strain>;
  phenotypes?: Maybe<Array<Phenotype>>;
  plasmid?: Maybe<Scalars['String']>;
  publications?: Maybe<Array<Publication>>;
  species: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  systematicName: Scalars['String'];
  updatedAt: Scalars['Timestamp'];
  updatedBy: User;
};

export type StrainListFilter = {
  id?: InputMaybe<Scalars['ID']>;
  inStock?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  strainType: StrainType;
  summary?: InputMaybe<Scalars['String']>;
};

export type StrainListWithCursor = {
  __typename?: 'StrainListWithCursor';
  limit?: Maybe<Scalars['Int']>;
  nextCursor: Scalars['Int'];
  previousCursor: Scalars['Int'];
  strains: Array<Strain>;
  totalCount: Scalars['Int'];
};

export enum StrainType {
  All = 'ALL',
  Bacterial = 'BACTERIAL',
  Gwdi = 'GWDI',
  Regular = 'REGULAR'
}

export type UpdateContentInput = {
  content: Scalars['String'];
  id: Scalars['ID'];
  updatedBy: Scalars['String'];
};

export type UpdateOrderInput = {
  comments?: InputMaybe<Scalars['String']>;
  courier?: InputMaybe<Scalars['String']>;
  courierAccount?: InputMaybe<Scalars['String']>;
  items?: InputMaybe<Array<Scalars['String']>>;
  payment?: InputMaybe<Scalars['String']>;
  purchaseOrderNum?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<StatusEnum>;
};

export type UpdatePermissionInput = {
  description: Scalars['String'];
  permission: Scalars['String'];
  resource: Scalars['String'];
};

export type UpdatePlasmidInput = {
  dbxrefs?: InputMaybe<Array<Scalars['String']>>;
  depositor?: InputMaybe<Scalars['String']>;
  editableSummary?: InputMaybe<Scalars['String']>;
  genbankAccession?: InputMaybe<Scalars['String']>;
  genes?: InputMaybe<Array<Scalars['String']>>;
  imageMap?: InputMaybe<Scalars['String']>;
  inStock?: InputMaybe<Scalars['Boolean']>;
  keywords?: InputMaybe<Array<Scalars['String']>>;
  name?: InputMaybe<Scalars['String']>;
  publications?: InputMaybe<Array<Scalars['String']>>;
  sequence?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  updatedBy: Scalars['String'];
};

export type UpdateRoleInput = {
  description: Scalars['String'];
  role: Scalars['String'];
};

export type UpdateStrainInput = {
  characteristics?: InputMaybe<Array<Scalars['String']>>;
  dbxrefs?: InputMaybe<Array<Scalars['String']>>;
  depositor?: InputMaybe<Scalars['String']>;
  editableSummary?: InputMaybe<Scalars['String']>;
  genes?: InputMaybe<Array<Scalars['String']>>;
  geneticModification?: InputMaybe<Scalars['String']>;
  genotypes?: InputMaybe<Array<Scalars['String']>>;
  inStock?: InputMaybe<Scalars['Boolean']>;
  label?: InputMaybe<Scalars['String']>;
  mutagenesisMethod?: InputMaybe<Scalars['String']>;
  names?: InputMaybe<Array<Scalars['String']>>;
  parent?: InputMaybe<Scalars['String']>;
  phenotypes?: InputMaybe<Array<Scalars['String']>>;
  plasmid?: InputMaybe<Scalars['String']>;
  publications?: InputMaybe<Array<Scalars['String']>>;
  species?: InputMaybe<Scalars['String']>;
  summary?: InputMaybe<Scalars['String']>;
  systematicName?: InputMaybe<Scalars['String']>;
  updatedBy: Scalars['String'];
};

export type UpdateUserInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  firstAddress?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  groupName?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  organization?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  secondAddress?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['Timestamp'];
  email: Scalars['String'];
  firstAddress?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  groupName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  organization?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Role>>;
  secondAddress?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt: Scalars['Timestamp'];
  zipcode?: Maybe<Scalars['String']>;
};

export type UserList = {
  __typename?: 'UserList';
  pageNum?: Maybe<Scalars['String']>;
  pageSize?: Maybe<Scalars['String']>;
  totalCount: Scalars['Int'];
  users: Array<User>;
};

export type With = {
  __typename?: 'With';
  db: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Auth', token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles?: Array<{ __typename?: 'Role', name: string, permissions?: Array<{ __typename?: 'Permission', level: string, resource?: string | null }> | null }> | null }, identity: { __typename?: 'Identity', provider: string } } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'Logout', success: boolean } | null };

export type CreateContentMutationVariables = Exact<{
  input: CreateContentInput;
}>;


export type CreateContentMutation = { __typename?: 'Mutation', createContent?: { __typename?: 'Content', name: string, content: string, namespace: string, createdBy: { __typename?: 'User', id: string } } | null };

export type UpdateContentMutationVariables = Exact<{
  input: UpdateContentInput;
}>;


export type UpdateContentMutation = { __typename?: 'Mutation', updateContent?: { __typename?: 'Content', id: string, content: string, updatedBy: { __typename?: 'User', id: string } } | null };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder?: { __typename?: 'Order', id: string } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', id: string } | null };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'User', id: string } | null };

export type GetRefreshTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type GetRefreshTokenQuery = { __typename?: 'Query', refreshToken?: { __typename?: 'Auth', token: string, user: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles?: Array<{ __typename?: 'Role', name: string, permissions?: Array<{ __typename?: 'Permission', level: string, resource?: string | null }> | null }> | null }, identity: { __typename?: 'Identity', provider: string } } | null };

export type ContentBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type ContentBySlugQuery = { __typename?: 'Query', contentBySlug?: { __typename?: 'Content', id: string, content: string, name: string, slug: string, updatedAt: any, updatedBy: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles?: Array<{ __typename?: 'Role', name: string, permissions?: Array<{ __typename?: 'Permission', level: string, resource?: string | null }> | null }> | null } } | null };

export type ContentQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ContentQuery = { __typename?: 'Query', content?: { __typename?: 'Content', id: string, content: string, name: string, slug: string, namespace: string, updatedAt: any, updatedBy: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, roles?: Array<{ __typename?: 'Role', name: string, permissions?: Array<{ __typename?: 'Permission', level: string, resource?: string | null }> | null }> | null } } | null };

export type ListNewsContentQueryVariables = Exact<{ [key: string]: never; }>;


export type ListNewsContentQuery = { __typename?: 'Query', listContent?: Array<{ __typename?: 'Content', id: string, content: string, name: string, updatedAt: any }> | null };

export type ListOrganismsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListOrganismsQuery = { __typename?: 'Query', listOrganisms?: Array<{ __typename?: 'Organism', taxonId: string, scientificName: string, citations: Array<{ __typename?: 'Citation', title: string, authors: string, pubmedId: string, journal: string }>, downloads: Array<{ __typename?: 'Download', title: string, items: Array<{ __typename?: 'DownloadItem', title: string, url: string }> }> }> | null };

export type GeneQueryVariables = Exact<{
  gene: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Scalars['String']>;
}>;


export type GeneQuery = { __typename?: 'Query', allStrains?: { __typename?: 'Gene', id: string, name: string, strains?: Array<{ __typename?: 'Strain', id: string, label: string, characteristics?: Array<string> | null, inStock: boolean, phenotypes?: Array<{ __typename?: 'Phenotype', phenotype: string, publication?: { __typename?: 'Publication', id: string, title: string, journal: string, pages?: string | null, volume?: string | null, pubDate?: any | null, authors: Array<{ __typename?: 'Author', lastName: string, rank?: string | null }> } | null }> | null }> | null } | null, gene?: { __typename?: 'Gene', id: string, name: string, goas?: Array<{ __typename?: 'GOAnnotation', id: string, type: string, date: string, evidenceCode: string, goTerm: string, qualifier: string, publication: string, assignedBy: string, with?: Array<{ __typename?: 'With', id: string, db: string, name: string }> | null, extensions?: Array<{ __typename?: 'Extension', id: string, db: string, relation: string, name: string }> | null }> | null } | null, allPublications: { __typename?: 'NumberOfPublicationsWithGene', numPubs: number, publications: Array<{ __typename?: 'PublicationWithGene', id: string, doi?: string | null, title: string, journal: string, pubDate?: any | null, volume?: string | null, pages?: string | null, pubType: string, source: string, issue?: string | null, relatedGenes: Array<{ __typename?: 'Gene', id: string, name: string }>, authors: Array<{ __typename?: 'Author', lastName: string, rank?: string | null }> }> }, allOrthologs?: { __typename?: 'Gene', id: string, name: string, orthologs?: Array<{ __typename?: 'Orthologs', species: string, geneProduct: string, source: Array<string>, id: { __typename?: 'NameWithLink', name: string, link: string }, uniprotkb: { __typename?: 'NameWithLink', name: string, link: string } }> | null } | null, listGeneProductInfo?: { __typename?: 'Gene', id: string, name: string, productInfo?: Array<{ __typename?: 'ProductInformation', proteinLength: string, proteinMolecularWeight: string, moreProteinData: string, proteinCodingGene: { __typename?: 'NameWithLink', name: string, link: string }, genomicCoords: Array<{ __typename?: 'GenomicCoordinates', exon: string, localCoords: string, chromCoords: string }> }> | null } | null, generalInformation?: { __typename?: 'Gene', id: string, name: string, generalInfo: { __typename?: 'GeneralInfo', nameDescription: Array<string>, altGeneName?: Array<string> | null, geneProduct: string, altProteinNames?: Array<string> | null, description: string } } | null, associatedSequnces?: { __typename?: 'Gene', id: string, name: string, associatedSequences: { __typename?: 'AssociatedSequences', moreLink: string, genbankGenomicFragment?: { __typename?: 'NameWithLink', name: string, link: string } | null, genbankMrna?: { __typename?: 'NameWithLink', name: string, link: string } | null, ests: Array<{ __typename?: 'NameWithLink', name: string, link: string }> } } | null, links?: { __typename?: 'Gene', id: string, name: string, links: { __typename?: 'Links', expression: Array<{ __typename?: 'NameWithLink', name: string, link: string }>, colleagues: { __typename?: 'NameWithLink', name: string, link: string }, extResources: Array<{ __typename?: 'NameWithLink', name: string, link: string }> } } | null, proteinInformation?: { __typename?: 'Gene', id: string, name: string, proteinInformation?: { __typename?: 'ProteinInformation', proteinSequence: string, generalInfo: { __typename?: 'ProteinGeneralInfo', geneProduct: string, dictybaseId: string, description: string, proteinLength: string, molecularWeight: string, subcellularLocation: string, proteinExistence: string, note: string, aaComposition: { __typename?: 'NameWithLink', name: string, link: string } }, externalLinks: Array<{ __typename?: 'NameWithLink', name: string, link: string }> } | null } | null };

export type ListRecentGenesQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type ListRecentGenesQuery = { __typename?: 'Query', listRecentGenes?: Array<{ __typename?: 'Gene', id: string, name: string }> | null };

export type PublicationQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PublicationQuery = { __typename?: 'Query', publication?: { __typename?: 'Publication', id: string, doi?: string | null, title: string, abstract: string, journal: string, pubDate?: any | null, pages?: string | null, issue?: string | null, volume?: string | null, authors: Array<{ __typename?: 'Author', initials?: string | null, lastName: string }> } | null };

export type ListRecentPublicationsQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type ListRecentPublicationsQuery = { __typename?: 'Query', listRecentPublications?: Array<{ __typename?: 'Publication', id: string, doi?: string | null, title: string, abstract: string, journal: string, pubDate?: any | null, pages?: string | null, issue?: string | null, volume?: string | null, authors: Array<{ __typename?: 'Author', initials?: string | null, lastName: string }> }> | null };

export type StrainListQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
  filter?: InputMaybe<StrainListFilter>;
}>;


export type StrainListQuery = { __typename?: 'Query', listStrains?: { __typename?: 'StrainListWithCursor', nextCursor: number, totalCount: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, inStock: boolean }> } | null };

export type ListStrainsWithPhenotypeQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
  type: Scalars['String'];
  annotation: Scalars['String'];
}>;


export type ListStrainsWithPhenotypeQuery = { __typename?: 'Query', listStrainsWithAnnotation?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, genes?: Array<{ __typename?: 'Gene', name: string }> | null, publications?: Array<{ __typename?: 'Publication', id: string, pubDate?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, authors: Array<{ __typename?: 'Author', lastName: string }> }> | null }> } | null };

export type ListBacterialStrainsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListBacterialStrainsQuery = { __typename?: 'Query', bacterialFoodSource?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, inStock: boolean }> } | null, symbioticFarmerBacterium?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, inStock: boolean }> } | null };

export type ListStrainsInventoryQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ListStrainsInventoryQuery = { __typename?: 'Query', listStrainsWithAnnotation?: { __typename?: 'StrainListWithCursor', totalCount: number, nextCursor: number, strains: Array<{ __typename?: 'Strain', id: string, label: string, summary?: string | null, inStock: boolean }> } | null };

export type ListPlasmidsInventoryQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ListPlasmidsInventoryQuery = { __typename?: 'Query', listPlasmidsWithAnnotation?: { __typename?: 'PlasmidListWithCursor', totalCount: number, nextCursor: number, plasmids: Array<{ __typename?: 'Plasmid', id: string, name: string, summary?: string | null, inStock: boolean }> } | null };

export type PlasmidListFilterQueryVariables = Exact<{
  cursor: Scalars['Int'];
  limit: Scalars['Int'];
  filter: Scalars['String'];
}>;


export type PlasmidListFilterQuery = { __typename?: 'Query', listPlasmids?: { __typename?: 'PlasmidListWithCursor', nextCursor: number, totalCount: number, plasmids: Array<{ __typename?: 'Plasmid', id: string, name: string, summary?: string | null, inStock: boolean }> } | null };

export type PlasmidQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlasmidQuery = { __typename?: 'Query', plasmid?: { __typename?: 'Plasmid', id: string, name: string, summary?: string | null, dbxrefs?: Array<string> | null, imageMap?: string | null, sequence?: string | null, keywords?: Array<string> | null, genbankAccession?: string | null, inStock: boolean, depositor: { __typename?: 'User', firstName: string, lastName: string }, publications?: Array<{ __typename?: 'Publication', id: string, pubDate?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Author', lastName: string }> }> | null, genes?: Array<{ __typename?: 'Gene', name: string }> | null } | null };

export type StrainQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StrainQuery = { __typename?: 'Query', strain?: { __typename?: 'Strain', id: string, label: string, summary?: string | null, species: string, plasmid?: string | null, dbxrefs?: Array<string> | null, inStock: boolean, systematicName: string, genotypes?: Array<string> | null, mutagenesisMethod?: string | null, geneticModification?: string | null, names?: Array<string> | null, characteristics?: Array<string> | null, parent?: { __typename?: 'Strain', id: string, label: string } | null, depositor: { __typename?: 'User', firstName: string, lastName: string }, publications?: Array<{ __typename?: 'Publication', id: string, pubDate?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, doi?: string | null, authors: Array<{ __typename?: 'Author', lastName: string }> }> | null, genes?: Array<{ __typename?: 'Gene', name: string }> | null, phenotypes?: Array<{ __typename?: 'Phenotype', phenotype: string, note?: string | null, assay?: string | null, environment?: string | null, publication?: { __typename?: 'Publication', id: string, pubDate?: any | null, title: string, journal: string, volume?: string | null, pages?: string | null, authors: Array<{ __typename?: 'Author', lastName: string }> } | null }> | null } | null };

export type ListRecentPlasmidsQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type ListRecentPlasmidsQuery = { __typename?: 'Query', listRecentPlasmids?: Array<{ __typename?: 'Plasmid', id: string, createdAt: any, name: string }> | null };

export type ListRecentStrainsQueryVariables = Exact<{
  limit?: Scalars['Int'];
}>;


export type ListRecentStrainsQuery = { __typename?: 'Query', listRecentStrains?: Array<{ __typename?: 'Strain', id: string, createdAt: any, systematicName: string }> | null };

export type UserByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type UserByEmailQuery = { __typename?: 'Query', userByEmail?: { __typename?: 'User', id: string } | null };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      email
      firstName
      lastName
      roles {
        name
        permissions {
          level
          resource
        }
      }
    }
    identity {
      provider
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const CreateContentDocument = gql`
    mutation CreateContent($input: CreateContentInput!) {
  createContent(input: $input) {
    name
    createdBy {
      id
    }
    content
    namespace
  }
}
    `;
export type CreateContentMutationFn = Apollo.MutationFunction<CreateContentMutation, CreateContentMutationVariables>;

/**
 * __useCreateContentMutation__
 *
 * To run a mutation, you first call `useCreateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createContentMutation, { data, loading, error }] = useCreateContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateContentMutation(baseOptions?: Apollo.MutationHookOptions<CreateContentMutation, CreateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateContentMutation, CreateContentMutationVariables>(CreateContentDocument, options);
      }
export type CreateContentMutationHookResult = ReturnType<typeof useCreateContentMutation>;
export type CreateContentMutationResult = Apollo.MutationResult<CreateContentMutation>;
export type CreateContentMutationOptions = Apollo.BaseMutationOptions<CreateContentMutation, CreateContentMutationVariables>;
export const UpdateContentDocument = gql`
    mutation UpdateContent($input: UpdateContentInput!) {
  updateContent(input: $input) {
    id
    updatedBy {
      id
    }
    content
  }
}
    `;
export type UpdateContentMutationFn = Apollo.MutationFunction<UpdateContentMutation, UpdateContentMutationVariables>;

/**
 * __useUpdateContentMutation__
 *
 * To run a mutation, you first call `useUpdateContentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContentMutation, { data, loading, error }] = useUpdateContentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateContentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContentMutation, UpdateContentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContentMutation, UpdateContentMutationVariables>(UpdateContentDocument, options);
      }
export type UpdateContentMutationHookResult = ReturnType<typeof useUpdateContentMutation>;
export type UpdateContentMutationResult = Apollo.MutationResult<UpdateContentMutation>;
export type UpdateContentMutationOptions = Apollo.BaseMutationOptions<UpdateContentMutation, UpdateContentMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    id
  }
}
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetRefreshTokenDocument = gql`
    query GetRefreshToken($token: String!) {
  refreshToken(token: $token) {
    token
    user {
      id
      email
      firstName
      lastName
      roles {
        name
        permissions {
          level
          resource
        }
      }
    }
    identity {
      provider
    }
  }
}
    `;

/**
 * __useGetRefreshTokenQuery__
 *
 * To run a query within a React component, call `useGetRefreshTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRefreshTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRefreshTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useGetRefreshTokenQuery(baseOptions: Apollo.QueryHookOptions<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>(GetRefreshTokenDocument, options);
      }
export function useGetRefreshTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>(GetRefreshTokenDocument, options);
        }
export type GetRefreshTokenQueryHookResult = ReturnType<typeof useGetRefreshTokenQuery>;
export type GetRefreshTokenLazyQueryHookResult = ReturnType<typeof useGetRefreshTokenLazyQuery>;
export type GetRefreshTokenQueryResult = Apollo.QueryResult<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>;
export const ContentBySlugDocument = gql`
    query contentBySlug($slug: String!) {
  contentBySlug(slug: $slug) {
    id
    content
    name
    slug
    updatedAt
    updatedBy {
      id
      email
      firstName
      lastName
      roles {
        name
        permissions {
          level
          resource
        }
      }
    }
  }
}
    `;

/**
 * __useContentBySlugQuery__
 *
 * To run a query within a React component, call `useContentBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useContentBySlugQuery(baseOptions: Apollo.QueryHookOptions<ContentBySlugQuery, ContentBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContentBySlugQuery, ContentBySlugQueryVariables>(ContentBySlugDocument, options);
      }
export function useContentBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentBySlugQuery, ContentBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContentBySlugQuery, ContentBySlugQueryVariables>(ContentBySlugDocument, options);
        }
export type ContentBySlugQueryHookResult = ReturnType<typeof useContentBySlugQuery>;
export type ContentBySlugLazyQueryHookResult = ReturnType<typeof useContentBySlugLazyQuery>;
export type ContentBySlugQueryResult = Apollo.QueryResult<ContentBySlugQuery, ContentBySlugQueryVariables>;
export const ContentDocument = gql`
    query content($id: ID!) {
  content(id: $id) {
    id
    content
    name
    slug
    namespace
    updatedAt
    updatedBy {
      id
      email
      firstName
      lastName
      roles {
        name
        permissions {
          level
          resource
        }
      }
    }
  }
}
    `;

/**
 * __useContentQuery__
 *
 * To run a query within a React component, call `useContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useContentQuery(baseOptions: Apollo.QueryHookOptions<ContentQuery, ContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContentQuery, ContentQueryVariables>(ContentDocument, options);
      }
export function useContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContentQuery, ContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContentQuery, ContentQueryVariables>(ContentDocument, options);
        }
export type ContentQueryHookResult = ReturnType<typeof useContentQuery>;
export type ContentLazyQueryHookResult = ReturnType<typeof useContentLazyQuery>;
export type ContentQueryResult = Apollo.QueryResult<ContentQuery, ContentQueryVariables>;
export const ListNewsContentDocument = gql`
    query ListNewsContent {
  listContent {
    id
    content
    name
    updatedAt
  }
}
    `;

/**
 * __useListNewsContentQuery__
 *
 * To run a query within a React component, call `useListNewsContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useListNewsContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListNewsContentQuery({
 *   variables: {
 *   },
 * });
 */
export function useListNewsContentQuery(baseOptions?: Apollo.QueryHookOptions<ListNewsContentQuery, ListNewsContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListNewsContentQuery, ListNewsContentQueryVariables>(ListNewsContentDocument, options);
      }
export function useListNewsContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListNewsContentQuery, ListNewsContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListNewsContentQuery, ListNewsContentQueryVariables>(ListNewsContentDocument, options);
        }
export type ListNewsContentQueryHookResult = ReturnType<typeof useListNewsContentQuery>;
export type ListNewsContentLazyQueryHookResult = ReturnType<typeof useListNewsContentLazyQuery>;
export type ListNewsContentQueryResult = Apollo.QueryResult<ListNewsContentQuery, ListNewsContentQueryVariables>;
export const ListOrganismsDocument = gql`
    query ListOrganisms {
  listOrganisms {
    taxonId
    scientificName
    citations {
      title
      authors
      pubmedId
      journal
    }
    downloads {
      title
      items {
        title
        url
      }
    }
  }
}
    `;

/**
 * __useListOrganismsQuery__
 *
 * To run a query within a React component, call `useListOrganismsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListOrganismsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListOrganismsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListOrganismsQuery(baseOptions?: Apollo.QueryHookOptions<ListOrganismsQuery, ListOrganismsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOrganismsQuery, ListOrganismsQueryVariables>(ListOrganismsDocument, options);
      }
export function useListOrganismsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOrganismsQuery, ListOrganismsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOrganismsQuery, ListOrganismsQueryVariables>(ListOrganismsDocument, options);
        }
export type ListOrganismsQueryHookResult = ReturnType<typeof useListOrganismsQuery>;
export type ListOrganismsLazyQueryHookResult = ReturnType<typeof useListOrganismsLazyQuery>;
export type ListOrganismsQueryResult = Apollo.QueryResult<ListOrganismsQuery, ListOrganismsQueryVariables>;
export const GeneDocument = gql`
    query Gene($gene: String!, $limit: Int, $sortBy: String = "desc") {
  allStrains(gene: $gene) {
    id
    name
    strains {
      id
      label
      characteristics
      inStock
      phenotypes {
        phenotype
        publication {
          id
          title
          journal
          pages
          volume
          pubDate
          authors {
            lastName
            rank
          }
        }
      }
    }
  }
  gene(gene: $gene) {
    id
    name
    goas {
      id
      type
      date
      evidenceCode
      goTerm
      qualifier
      publication
      assignedBy
      with {
        id
        db
        name
      }
      extensions {
        id
        db
        relation
        name
      }
    }
  }
  allPublications(gene: $gene, limit: $limit, sortBy: $sortBy) {
    numPubs
    publications {
      relatedGenes {
        id
        name
      }
      id
      doi
      title
      journal
      pubDate
      volume
      pages
      pubType
      source
      issue
      authors {
        lastName
        rank
      }
    }
  }
  allOrthologs(gene: $gene) {
    id
    name
    orthologs {
      id {
        name
        link
      }
      species
      uniprotkb {
        name
        link
      }
      geneProduct
      source
    }
  }
  listGeneProductInfo(gene: $gene) {
    id
    name
    productInfo {
      proteinCodingGene {
        name
        link
      }
      proteinLength
      proteinMolecularWeight
      moreProteinData
      genomicCoords {
        exon
        localCoords
        chromCoords
      }
    }
  }
  generalInformation(gene: $gene) {
    id
    name
    generalInfo {
      nameDescription
      altGeneName
      geneProduct
      altProteinNames
      description
    }
  }
  associatedSequnces(gene: $gene) {
    id
    name
    associatedSequences {
      genbankGenomicFragment {
        name
        link
      }
      genbankMrna {
        name
        link
      }
      ests {
        name
        link
      }
      moreLink
    }
  }
  links(gene: $gene) {
    id
    name
    links {
      expression {
        name
        link
      }
      colleagues {
        name
        link
      }
      extResources {
        name
        link
      }
    }
  }
  proteinInformation(gene: $gene) {
    id
    name
    proteinInformation {
      generalInfo {
        geneProduct
        dictybaseId
        description
        proteinLength
        molecularWeight
        aaComposition {
          name
          link
        }
        subcellularLocation
        proteinExistence
        note
      }
      externalLinks {
        name
        link
      }
      proteinSequence
    }
  }
}
    `;

/**
 * __useGeneQuery__
 *
 * To run a query within a React component, call `useGeneQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeneQuery({
 *   variables: {
 *      gene: // value for 'gene'
 *      limit: // value for 'limit'
 *      sortBy: // value for 'sortBy'
 *   },
 * });
 */
export function useGeneQuery(baseOptions: Apollo.QueryHookOptions<GeneQuery, GeneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GeneQuery, GeneQueryVariables>(GeneDocument, options);
      }
export function useGeneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GeneQuery, GeneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GeneQuery, GeneQueryVariables>(GeneDocument, options);
        }
export type GeneQueryHookResult = ReturnType<typeof useGeneQuery>;
export type GeneLazyQueryHookResult = ReturnType<typeof useGeneLazyQuery>;
export type GeneQueryResult = Apollo.QueryResult<GeneQuery, GeneQueryVariables>;
export const ListRecentGenesDocument = gql`
    query ListRecentGenes($limit: Int! = 4) {
  listRecentGenes(limit: $limit) {
    id
    name
  }
}
    `;

/**
 * __useListRecentGenesQuery__
 *
 * To run a query within a React component, call `useListRecentGenesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRecentGenesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRecentGenesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListRecentGenesQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentGenesQuery, ListRecentGenesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRecentGenesQuery, ListRecentGenesQueryVariables>(ListRecentGenesDocument, options);
      }
export function useListRecentGenesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentGenesQuery, ListRecentGenesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRecentGenesQuery, ListRecentGenesQueryVariables>(ListRecentGenesDocument, options);
        }
export type ListRecentGenesQueryHookResult = ReturnType<typeof useListRecentGenesQuery>;
export type ListRecentGenesLazyQueryHookResult = ReturnType<typeof useListRecentGenesLazyQuery>;
export type ListRecentGenesQueryResult = Apollo.QueryResult<ListRecentGenesQuery, ListRecentGenesQueryVariables>;
export const PublicationDocument = gql`
    query Publication($id: ID!) {
  publication(id: $id) {
    id
    doi
    title
    abstract
    journal
    pubDate
    pages
    issue
    volume
    authors {
      initials
      lastName
    }
  }
}
    `;

/**
 * __usePublicationQuery__
 *
 * To run a query within a React component, call `usePublicationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublicationQuery(baseOptions: Apollo.QueryHookOptions<PublicationQuery, PublicationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublicationQuery, PublicationQueryVariables>(PublicationDocument, options);
      }
export function usePublicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublicationQuery, PublicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublicationQuery, PublicationQueryVariables>(PublicationDocument, options);
        }
export type PublicationQueryHookResult = ReturnType<typeof usePublicationQuery>;
export type PublicationLazyQueryHookResult = ReturnType<typeof usePublicationLazyQuery>;
export type PublicationQueryResult = Apollo.QueryResult<PublicationQuery, PublicationQueryVariables>;
export const ListRecentPublicationsDocument = gql`
    query ListRecentPublications($limit: Int! = 4) {
  listRecentPublications(limit: $limit) {
    id
    doi
    title
    abstract
    journal
    pubDate
    pages
    issue
    volume
    authors {
      initials
      lastName
    }
  }
}
    `;

/**
 * __useListRecentPublicationsQuery__
 *
 * To run a query within a React component, call `useListRecentPublicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRecentPublicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRecentPublicationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListRecentPublicationsQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>(ListRecentPublicationsDocument, options);
      }
export function useListRecentPublicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>(ListRecentPublicationsDocument, options);
        }
export type ListRecentPublicationsQueryHookResult = ReturnType<typeof useListRecentPublicationsQuery>;
export type ListRecentPublicationsLazyQueryHookResult = ReturnType<typeof useListRecentPublicationsLazyQuery>;
export type ListRecentPublicationsQueryResult = Apollo.QueryResult<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>;
export const StrainListDocument = gql`
    query StrainList($cursor: Int!, $limit: Int!, $filter: StrainListFilter) {
  listStrains(cursor: $cursor, limit: $limit, filter: $filter) {
    nextCursor
    totalCount
    strains {
      id
      label
      summary
      inStock
    }
  }
}
    `;

/**
 * __useStrainListQuery__
 *
 * To run a query within a React component, call `useStrainListQuery` and pass it any options that fit your needs.
 * When your component renders, `useStrainListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStrainListQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useStrainListQuery(baseOptions: Apollo.QueryHookOptions<StrainListQuery, StrainListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StrainListQuery, StrainListQueryVariables>(StrainListDocument, options);
      }
export function useStrainListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StrainListQuery, StrainListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StrainListQuery, StrainListQueryVariables>(StrainListDocument, options);
        }
export type StrainListQueryHookResult = ReturnType<typeof useStrainListQuery>;
export type StrainListLazyQueryHookResult = ReturnType<typeof useStrainListLazyQuery>;
export type StrainListQueryResult = Apollo.QueryResult<StrainListQuery, StrainListQueryVariables>;
export const ListStrainsWithPhenotypeDocument = gql`
    query ListStrainsWithPhenotype($cursor: Int!, $limit: Int!, $type: String!, $annotation: String!) {
  listStrainsWithAnnotation(
    cursor: $cursor
    limit: $limit
    type: $type
    annotation: $annotation
  ) {
    totalCount
    nextCursor
    strains {
      id
      label
      genes {
        name
      }
      publications {
        id
        pubDate
        title
        journal
        volume
        pages
        authors {
          lastName
        }
      }
    }
  }
}
    `;

/**
 * __useListStrainsWithPhenotypeQuery__
 *
 * To run a query within a React component, call `useListStrainsWithPhenotypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useListStrainsWithPhenotypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListStrainsWithPhenotypeQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      type: // value for 'type'
 *      annotation: // value for 'annotation'
 *   },
 * });
 */
export function useListStrainsWithPhenotypeQuery(baseOptions: Apollo.QueryHookOptions<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>(ListStrainsWithPhenotypeDocument, options);
      }
export function useListStrainsWithPhenotypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>(ListStrainsWithPhenotypeDocument, options);
        }
export type ListStrainsWithPhenotypeQueryHookResult = ReturnType<typeof useListStrainsWithPhenotypeQuery>;
export type ListStrainsWithPhenotypeLazyQueryHookResult = ReturnType<typeof useListStrainsWithPhenotypeLazyQuery>;
export type ListStrainsWithPhenotypeQueryResult = Apollo.QueryResult<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>;
export const ListBacterialStrainsDocument = gql`
    query ListBacterialStrains {
  bacterialFoodSource: listStrainsWithAnnotation(
    cursor: 0
    limit: 100
    type: "characteristic"
    annotation: "bacterial food source"
  ) {
    totalCount
    nextCursor
    strains {
      id
      label
      summary
      inStock
    }
  }
  symbioticFarmerBacterium: listStrainsWithAnnotation(
    cursor: 0
    limit: 100
    type: "characteristic"
    annotation: "symbiotic farmer bacterium"
  ) {
    totalCount
    nextCursor
    strains {
      id
      label
      summary
      inStock
    }
  }
}
    `;

/**
 * __useListBacterialStrainsQuery__
 *
 * To run a query within a React component, call `useListBacterialStrainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBacterialStrainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBacterialStrainsQuery({
 *   variables: {
 *   },
 * });
 */
export function useListBacterialStrainsQuery(baseOptions?: Apollo.QueryHookOptions<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>(ListBacterialStrainsDocument, options);
      }
export function useListBacterialStrainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>(ListBacterialStrainsDocument, options);
        }
export type ListBacterialStrainsQueryHookResult = ReturnType<typeof useListBacterialStrainsQuery>;
export type ListBacterialStrainsLazyQueryHookResult = ReturnType<typeof useListBacterialStrainsLazyQuery>;
export type ListBacterialStrainsQueryResult = Apollo.QueryResult<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>;
export const ListStrainsInventoryDocument = gql`
    query ListStrainsInventory($cursor: Int!, $limit: Int!) {
  listStrainsWithAnnotation(
    cursor: $cursor
    limit: $limit
    type: "strainInventory"
    annotation: "strainInventory"
  ) {
    totalCount
    nextCursor
    strains {
      id
      label
      summary
      inStock
    }
  }
}
    `;

/**
 * __useListStrainsInventoryQuery__
 *
 * To run a query within a React component, call `useListStrainsInventoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useListStrainsInventoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListStrainsInventoryQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListStrainsInventoryQuery(baseOptions: Apollo.QueryHookOptions<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>(ListStrainsInventoryDocument, options);
      }
export function useListStrainsInventoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>(ListStrainsInventoryDocument, options);
        }
export type ListStrainsInventoryQueryHookResult = ReturnType<typeof useListStrainsInventoryQuery>;
export type ListStrainsInventoryLazyQueryHookResult = ReturnType<typeof useListStrainsInventoryLazyQuery>;
export type ListStrainsInventoryQueryResult = Apollo.QueryResult<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>;
export const ListPlasmidsInventoryDocument = gql`
    query ListPlasmidsInventory($cursor: Int!, $limit: Int!) {
  listPlasmidsWithAnnotation(
    cursor: $cursor
    limit: $limit
    type: "plasmidInventory"
    annotation: "plasmid inventory"
  ) {
    totalCount
    nextCursor
    plasmids {
      id
      name
      summary
      inStock
    }
  }
}
    `;

/**
 * __useListPlasmidsInventoryQuery__
 *
 * To run a query within a React component, call `useListPlasmidsInventoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPlasmidsInventoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPlasmidsInventoryQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListPlasmidsInventoryQuery(baseOptions: Apollo.QueryHookOptions<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>(ListPlasmidsInventoryDocument, options);
      }
export function useListPlasmidsInventoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>(ListPlasmidsInventoryDocument, options);
        }
export type ListPlasmidsInventoryQueryHookResult = ReturnType<typeof useListPlasmidsInventoryQuery>;
export type ListPlasmidsInventoryLazyQueryHookResult = ReturnType<typeof useListPlasmidsInventoryLazyQuery>;
export type ListPlasmidsInventoryQueryResult = Apollo.QueryResult<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>;
export const PlasmidListFilterDocument = gql`
    query PlasmidListFilter($cursor: Int!, $limit: Int!, $filter: String!) {
  listPlasmids(cursor: $cursor, limit: $limit, filter: $filter) {
    nextCursor
    totalCount
    plasmids {
      id
      name
      summary
      inStock
    }
  }
}
    `;

/**
 * __usePlasmidListFilterQuery__
 *
 * To run a query within a React component, call `usePlasmidListFilterQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlasmidListFilterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlasmidListFilterQuery({
 *   variables: {
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePlasmidListFilterQuery(baseOptions: Apollo.QueryHookOptions<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>(PlasmidListFilterDocument, options);
      }
export function usePlasmidListFilterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>(PlasmidListFilterDocument, options);
        }
export type PlasmidListFilterQueryHookResult = ReturnType<typeof usePlasmidListFilterQuery>;
export type PlasmidListFilterLazyQueryHookResult = ReturnType<typeof usePlasmidListFilterLazyQuery>;
export type PlasmidListFilterQueryResult = Apollo.QueryResult<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>;
export const PlasmidDocument = gql`
    query Plasmid($id: ID!) {
  plasmid(id: $id) {
    id
    name
    summary
    depositor {
      firstName
      lastName
    }
    publications {
      id
      pubDate
      title
      journal
      volume
      pages
      doi
      authors {
        lastName
      }
    }
    dbxrefs
    genes {
      name
    }
    imageMap
    sequence
    keywords
    genbankAccession
    inStock
  }
}
    `;

/**
 * __usePlasmidQuery__
 *
 * To run a query within a React component, call `usePlasmidQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlasmidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlasmidQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePlasmidQuery(baseOptions: Apollo.QueryHookOptions<PlasmidQuery, PlasmidQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlasmidQuery, PlasmidQueryVariables>(PlasmidDocument, options);
      }
export function usePlasmidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlasmidQuery, PlasmidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlasmidQuery, PlasmidQueryVariables>(PlasmidDocument, options);
        }
export type PlasmidQueryHookResult = ReturnType<typeof usePlasmidQuery>;
export type PlasmidLazyQueryHookResult = ReturnType<typeof usePlasmidLazyQuery>;
export type PlasmidQueryResult = Apollo.QueryResult<PlasmidQuery, PlasmidQueryVariables>;
export const StrainDocument = gql`
    query Strain($id: ID!) {
  strain(id: $id) {
    id
    label
    summary
    species
    parent {
      id
      label
    }
    depositor {
      firstName
      lastName
    }
    plasmid
    dbxrefs
    publications {
      id
      pubDate
      title
      journal
      volume
      pages
      doi
      authors {
        lastName
      }
    }
    genes {
      name
    }
    inStock
    systematicName
    genotypes
    mutagenesisMethod
    geneticModification
    names
    characteristics
    phenotypes {
      phenotype
      note
      assay
      environment
      publication {
        id
        pubDate
        title
        journal
        volume
        pages
        authors {
          lastName
        }
      }
    }
  }
}
    `;

/**
 * __useStrainQuery__
 *
 * To run a query within a React component, call `useStrainQuery` and pass it any options that fit your needs.
 * When your component renders, `useStrainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStrainQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStrainQuery(baseOptions: Apollo.QueryHookOptions<StrainQuery, StrainQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StrainQuery, StrainQueryVariables>(StrainDocument, options);
      }
export function useStrainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StrainQuery, StrainQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StrainQuery, StrainQueryVariables>(StrainDocument, options);
        }
export type StrainQueryHookResult = ReturnType<typeof useStrainQuery>;
export type StrainLazyQueryHookResult = ReturnType<typeof useStrainLazyQuery>;
export type StrainQueryResult = Apollo.QueryResult<StrainQuery, StrainQueryVariables>;
export const ListRecentPlasmidsDocument = gql`
    query ListRecentPlasmids($limit: Int! = 4) {
  listRecentPlasmids(limit: $limit) {
    id
    createdAt
    name
  }
}
    `;

/**
 * __useListRecentPlasmidsQuery__
 *
 * To run a query within a React component, call `useListRecentPlasmidsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRecentPlasmidsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRecentPlasmidsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListRecentPlasmidsQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>(ListRecentPlasmidsDocument, options);
      }
export function useListRecentPlasmidsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>(ListRecentPlasmidsDocument, options);
        }
export type ListRecentPlasmidsQueryHookResult = ReturnType<typeof useListRecentPlasmidsQuery>;
export type ListRecentPlasmidsLazyQueryHookResult = ReturnType<typeof useListRecentPlasmidsLazyQuery>;
export type ListRecentPlasmidsQueryResult = Apollo.QueryResult<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>;
export const ListRecentStrainsDocument = gql`
    query ListRecentStrains($limit: Int! = 4) {
  listRecentStrains(limit: $limit) {
    id
    createdAt
    systematicName
  }
}
    `;

/**
 * __useListRecentStrainsQuery__
 *
 * To run a query within a React component, call `useListRecentStrainsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListRecentStrainsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListRecentStrainsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useListRecentStrainsQuery(baseOptions?: Apollo.QueryHookOptions<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>(ListRecentStrainsDocument, options);
      }
export function useListRecentStrainsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>(ListRecentStrainsDocument, options);
        }
export type ListRecentStrainsQueryHookResult = ReturnType<typeof useListRecentStrainsQuery>;
export type ListRecentStrainsLazyQueryHookResult = ReturnType<typeof useListRecentStrainsLazyQuery>;
export type ListRecentStrainsQueryResult = Apollo.QueryResult<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>;
export const UserByEmailDocument = gql`
    query UserByEmail($email: String!) {
  userByEmail(email: $email) {
    id
  }
}
    `;

/**
 * __useUserByEmailQuery__
 *
 * To run a query within a React component, call `useUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<UserByEmailQuery, UserByEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserByEmailQuery, UserByEmailQueryVariables>(UserByEmailDocument, options);
      }
export function useUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserByEmailQuery, UserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserByEmailQuery, UserByEmailQueryVariables>(UserByEmailDocument, options);
        }
export type UserByEmailQueryHookResult = ReturnType<typeof useUserByEmailQuery>;
export type UserByEmailLazyQueryHookResult = ReturnType<typeof useUserByEmailLazyQuery>;
export type UserByEmailQueryResult = Apollo.QueryResult<UserByEmailQuery, UserByEmailQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "BasePublication": [
      "Publication",
      "PublicationWithGene"
    ],
    "Stock": [
      "Plasmid",
      "Strain"
    ]
  }
};
      export default result;
    
export type AssociatedSequencesKeySpecifier = ('ests' | 'genbankGenomicFragment' | 'genbankMrna' | 'moreLink' | AssociatedSequencesKeySpecifier)[];
export type AssociatedSequencesFieldPolicy = {
	ests?: FieldPolicy<any> | FieldReadFunction<any>,
	genbankGenomicFragment?: FieldPolicy<any> | FieldReadFunction<any>,
	genbankMrna?: FieldPolicy<any> | FieldReadFunction<any>,
	moreLink?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthKeySpecifier = ('identity' | 'token' | 'user' | AuthKeySpecifier)[];
export type AuthFieldPolicy = {
	identity?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuthorKeySpecifier = ('firstName' | 'initials' | 'lastName' | 'rank' | AuthorKeySpecifier)[];
export type AuthorFieldPolicy = {
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	initials?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	rank?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BasePublicationKeySpecifier = ('abstract' | 'authors' | 'doi' | 'id' | 'issn' | 'issue' | 'journal' | 'pages' | 'pubDate' | 'pubType' | 'source' | 'status' | 'title' | 'volume' | BasePublicationKeySpecifier)[];
export type BasePublicationFieldPolicy = {
	abstract?: FieldPolicy<any> | FieldReadFunction<any>,
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	doi?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issn?: FieldPolicy<any> | FieldReadFunction<any>,
	issue?: FieldPolicy<any> | FieldReadFunction<any>,
	journal?: FieldPolicy<any> | FieldReadFunction<any>,
	pages?: FieldPolicy<any> | FieldReadFunction<any>,
	pubDate?: FieldPolicy<any> | FieldReadFunction<any>,
	pubType?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	volume?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CitationKeySpecifier = ('authors' | 'journal' | 'pubmedId' | 'title' | CitationKeySpecifier)[];
export type CitationFieldPolicy = {
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	journal?: FieldPolicy<any> | FieldReadFunction<any>,
	pubmedId?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContentKeySpecifier = ('content' | 'createdAt' | 'createdBy' | 'id' | 'name' | 'namespace' | 'slug' | 'updatedAt' | 'updatedBy' | ContentKeySpecifier)[];
export type ContentFieldPolicy = {
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	namespace?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteContentKeySpecifier = ('id' | 'success' | DeleteContentKeySpecifier)[];
export type DeleteContentFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeletePermissionKeySpecifier = ('id' | 'success' | DeletePermissionKeySpecifier)[];
export type DeletePermissionFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteRoleKeySpecifier = ('id' | 'success' | DeleteRoleKeySpecifier)[];
export type DeleteRoleFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteStockKeySpecifier = ('id' | 'success' | DeleteStockKeySpecifier)[];
export type DeleteStockFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteUserKeySpecifier = ('id' | 'success' | DeleteUserKeySpecifier)[];
export type DeleteUserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DownloadKeySpecifier = ('items' | 'title' | DownloadKeySpecifier)[];
export type DownloadFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DownloadItemKeySpecifier = ('title' | 'url' | DownloadItemKeySpecifier)[];
export type DownloadItemFieldPolicy = {
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ExtensionKeySpecifier = ('db' | 'id' | 'name' | 'relation' | ExtensionKeySpecifier)[];
export type ExtensionFieldPolicy = {
	db?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	relation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GOAnnotationKeySpecifier = ('assignedBy' | 'date' | 'evidenceCode' | 'extensions' | 'goTerm' | 'id' | 'publication' | 'qualifier' | 'type' | 'with' | GOAnnotationKeySpecifier)[];
export type GOAnnotationFieldPolicy = {
	assignedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	evidenceCode?: FieldPolicy<any> | FieldReadFunction<any>,
	extensions?: FieldPolicy<any> | FieldReadFunction<any>,
	goTerm?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	publication?: FieldPolicy<any> | FieldReadFunction<any>,
	qualifier?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	with?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GeneKeySpecifier = ('associatedSequences' | 'generalInfo' | 'goas' | 'id' | 'links' | 'name' | 'orthologs' | 'productInfo' | 'proteinInformation' | 'strains' | GeneKeySpecifier)[];
export type GeneFieldPolicy = {
	associatedSequences?: FieldPolicy<any> | FieldReadFunction<any>,
	generalInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	goas?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	orthologs?: FieldPolicy<any> | FieldReadFunction<any>,
	productInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	proteinInformation?: FieldPolicy<any> | FieldReadFunction<any>,
	strains?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GeneralInfoKeySpecifier = ('altGeneName' | 'altProteinNames' | 'description' | 'geneProduct' | 'nameDescription' | GeneralInfoKeySpecifier)[];
export type GeneralInfoFieldPolicy = {
	altGeneName?: FieldPolicy<any> | FieldReadFunction<any>,
	altProteinNames?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	geneProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	nameDescription?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GenomicCoordinatesKeySpecifier = ('chromCoords' | 'exon' | 'localCoords' | GenomicCoordinatesKeySpecifier)[];
export type GenomicCoordinatesFieldPolicy = {
	chromCoords?: FieldPolicy<any> | FieldReadFunction<any>,
	exon?: FieldPolicy<any> | FieldReadFunction<any>,
	localCoords?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IdentityKeySpecifier = ('createdAt' | 'id' | 'identifier' | 'provider' | 'updatedAt' | 'userId' | IdentityKeySpecifier)[];
export type IdentityFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	identifier?: FieldPolicy<any> | FieldReadFunction<any>,
	provider?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LinksKeySpecifier = ('colleagues' | 'expression' | 'extResources' | LinksKeySpecifier)[];
export type LinksFieldPolicy = {
	colleagues?: FieldPolicy<any> | FieldReadFunction<any>,
	expression?: FieldPolicy<any> | FieldReadFunction<any>,
	extResources?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LogoutKeySpecifier = ('success' | LogoutKeySpecifier)[];
export type LogoutFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createContent' | 'createOrder' | 'createPermission' | 'createPlasmid' | 'createRole' | 'createRolePermissionRelationship' | 'createStrain' | 'createUser' | 'createUserRoleRelationship' | 'deleteContent' | 'deletePermission' | 'deleteRole' | 'deleteStock' | 'deleteUser' | 'login' | 'logout' | 'updateContent' | 'updateOrder' | 'updatePermission' | 'updatePlasmid' | 'updateRole' | 'updateStrain' | 'updateUser' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createContent?: FieldPolicy<any> | FieldReadFunction<any>,
	createOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	createPermission?: FieldPolicy<any> | FieldReadFunction<any>,
	createPlasmid?: FieldPolicy<any> | FieldReadFunction<any>,
	createRole?: FieldPolicy<any> | FieldReadFunction<any>,
	createRolePermissionRelationship?: FieldPolicy<any> | FieldReadFunction<any>,
	createStrain?: FieldPolicy<any> | FieldReadFunction<any>,
	createUser?: FieldPolicy<any> | FieldReadFunction<any>,
	createUserRoleRelationship?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteContent?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePermission?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteRole?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteStock?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteUser?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>,
	updateContent?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePermission?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePlasmid?: FieldPolicy<any> | FieldReadFunction<any>,
	updateRole?: FieldPolicy<any> | FieldReadFunction<any>,
	updateStrain?: FieldPolicy<any> | FieldReadFunction<any>,
	updateUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NameWithLinkKeySpecifier = ('link' | 'name' | NameWithLinkKeySpecifier)[];
export type NameWithLinkFieldPolicy = {
	link?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NumberOfPublicationsWithGeneKeySpecifier = ('numPubs' | 'publications' | NumberOfPublicationsWithGeneKeySpecifier)[];
export type NumberOfPublicationsWithGeneFieldPolicy = {
	numPubs?: FieldPolicy<any> | FieldReadFunction<any>,
	publications?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderKeySpecifier = ('comments' | 'consumer' | 'courier' | 'courierAccount' | 'createdAt' | 'id' | 'items' | 'payer' | 'payment' | 'purchaseOrderNum' | 'purchaser' | 'status' | 'updatedAt' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	comments?: FieldPolicy<any> | FieldReadFunction<any>,
	consumer?: FieldPolicy<any> | FieldReadFunction<any>,
	courier?: FieldPolicy<any> | FieldReadFunction<any>,
	courierAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	payer?: FieldPolicy<any> | FieldReadFunction<any>,
	payment?: FieldPolicy<any> | FieldReadFunction<any>,
	purchaseOrderNum?: FieldPolicy<any> | FieldReadFunction<any>,
	purchaser?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderListWithCursorKeySpecifier = ('limit' | 'nextCursor' | 'orders' | 'previousCursor' | 'totalCount' | OrderListWithCursorKeySpecifier)[];
export type OrderListWithCursorFieldPolicy = {
	limit?: FieldPolicy<any> | FieldReadFunction<any>,
	nextCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	orders?: FieldPolicy<any> | FieldReadFunction<any>,
	previousCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrganismKeySpecifier = ('citations' | 'downloads' | 'scientificName' | 'taxonId' | OrganismKeySpecifier)[];
export type OrganismFieldPolicy = {
	citations?: FieldPolicy<any> | FieldReadFunction<any>,
	downloads?: FieldPolicy<any> | FieldReadFunction<any>,
	scientificName?: FieldPolicy<any> | FieldReadFunction<any>,
	taxonId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrthologsKeySpecifier = ('geneProduct' | 'id' | 'source' | 'species' | 'uniprotkb' | OrthologsKeySpecifier)[];
export type OrthologsFieldPolicy = {
	geneProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	species?: FieldPolicy<any> | FieldReadFunction<any>,
	uniprotkb?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PermissionKeySpecifier = ('createdAt' | 'description' | 'id' | 'level' | 'resource' | 'updatedAt' | PermissionKeySpecifier)[];
export type PermissionFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	level?: FieldPolicy<any> | FieldReadFunction<any>,
	resource?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PhenotypeKeySpecifier = ('assay' | 'environment' | 'note' | 'phenotype' | 'publication' | PhenotypeKeySpecifier)[];
export type PhenotypeFieldPolicy = {
	assay?: FieldPolicy<any> | FieldReadFunction<any>,
	environment?: FieldPolicy<any> | FieldReadFunction<any>,
	note?: FieldPolicy<any> | FieldReadFunction<any>,
	phenotype?: FieldPolicy<any> | FieldReadFunction<any>,
	publication?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlasmidKeySpecifier = ('createdAt' | 'createdBy' | 'dbxrefs' | 'depositor' | 'editableSummary' | 'genbankAccession' | 'genes' | 'id' | 'imageMap' | 'inStock' | 'keywords' | 'name' | 'publications' | 'sequence' | 'summary' | 'updatedAt' | 'updatedBy' | PlasmidKeySpecifier)[];
export type PlasmidFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	dbxrefs?: FieldPolicy<any> | FieldReadFunction<any>,
	depositor?: FieldPolicy<any> | FieldReadFunction<any>,
	editableSummary?: FieldPolicy<any> | FieldReadFunction<any>,
	genbankAccession?: FieldPolicy<any> | FieldReadFunction<any>,
	genes?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	imageMap?: FieldPolicy<any> | FieldReadFunction<any>,
	inStock?: FieldPolicy<any> | FieldReadFunction<any>,
	keywords?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	publications?: FieldPolicy<any> | FieldReadFunction<any>,
	sequence?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PlasmidListWithCursorKeySpecifier = ('limit' | 'nextCursor' | 'plasmids' | 'previousCursor' | 'totalCount' | PlasmidListWithCursorKeySpecifier)[];
export type PlasmidListWithCursorFieldPolicy = {
	limit?: FieldPolicy<any> | FieldReadFunction<any>,
	nextCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	plasmids?: FieldPolicy<any> | FieldReadFunction<any>,
	previousCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductInformationKeySpecifier = ('genomicCoords' | 'moreProteinData' | 'proteinCodingGene' | 'proteinLength' | 'proteinMolecularWeight' | ProductInformationKeySpecifier)[];
export type ProductInformationFieldPolicy = {
	genomicCoords?: FieldPolicy<any> | FieldReadFunction<any>,
	moreProteinData?: FieldPolicy<any> | FieldReadFunction<any>,
	proteinCodingGene?: FieldPolicy<any> | FieldReadFunction<any>,
	proteinLength?: FieldPolicy<any> | FieldReadFunction<any>,
	proteinMolecularWeight?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProteinGeneralInfoKeySpecifier = ('aaComposition' | 'description' | 'dictybaseId' | 'geneProduct' | 'molecularWeight' | 'note' | 'proteinExistence' | 'proteinLength' | 'subcellularLocation' | ProteinGeneralInfoKeySpecifier)[];
export type ProteinGeneralInfoFieldPolicy = {
	aaComposition?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	dictybaseId?: FieldPolicy<any> | FieldReadFunction<any>,
	geneProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	molecularWeight?: FieldPolicy<any> | FieldReadFunction<any>,
	note?: FieldPolicy<any> | FieldReadFunction<any>,
	proteinExistence?: FieldPolicy<any> | FieldReadFunction<any>,
	proteinLength?: FieldPolicy<any> | FieldReadFunction<any>,
	subcellularLocation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProteinInformationKeySpecifier = ('externalLinks' | 'generalInfo' | 'proteinSequence' | ProteinInformationKeySpecifier)[];
export type ProteinInformationFieldPolicy = {
	externalLinks?: FieldPolicy<any> | FieldReadFunction<any>,
	generalInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	proteinSequence?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PublicationKeySpecifier = ('abstract' | 'authors' | 'doi' | 'id' | 'issn' | 'issue' | 'journal' | 'pages' | 'pubDate' | 'pubType' | 'source' | 'status' | 'title' | 'volume' | PublicationKeySpecifier)[];
export type PublicationFieldPolicy = {
	abstract?: FieldPolicy<any> | FieldReadFunction<any>,
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	doi?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issn?: FieldPolicy<any> | FieldReadFunction<any>,
	issue?: FieldPolicy<any> | FieldReadFunction<any>,
	journal?: FieldPolicy<any> | FieldReadFunction<any>,
	pages?: FieldPolicy<any> | FieldReadFunction<any>,
	pubDate?: FieldPolicy<any> | FieldReadFunction<any>,
	pubType?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	volume?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PublicationWithGeneKeySpecifier = ('abstract' | 'authors' | 'doi' | 'id' | 'issn' | 'issue' | 'journal' | 'pages' | 'pubDate' | 'pubType' | 'relatedGenes' | 'source' | 'status' | 'title' | 'volume' | PublicationWithGeneKeySpecifier)[];
export type PublicationWithGeneFieldPolicy = {
	abstract?: FieldPolicy<any> | FieldReadFunction<any>,
	authors?: FieldPolicy<any> | FieldReadFunction<any>,
	doi?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	issn?: FieldPolicy<any> | FieldReadFunction<any>,
	issue?: FieldPolicy<any> | FieldReadFunction<any>,
	journal?: FieldPolicy<any> | FieldReadFunction<any>,
	pages?: FieldPolicy<any> | FieldReadFunction<any>,
	pubDate?: FieldPolicy<any> | FieldReadFunction<any>,
	pubType?: FieldPolicy<any> | FieldReadFunction<any>,
	relatedGenes?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	volume?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('allOrthologs' | 'allPublications' | 'allStrains' | 'associatedSequnces' | 'content' | 'contentBySlug' | 'gene' | 'generalInformation' | 'links' | 'listContent' | 'listGeneProductInfo' | 'listOrders' | 'listOrganisms' | 'listPermissions' | 'listPlasmids' | 'listPlasmidsWithAnnotation' | 'listRecentGenes' | 'listRecentPlasmids' | 'listRecentPublications' | 'listRecentStrains' | 'listRoles' | 'listStrains' | 'listStrainsWithAnnotation' | 'listUsers' | 'order' | 'organism' | 'permission' | 'plasmid' | 'proteinInformation' | 'publication' | 'refreshToken' | 'role' | 'strain' | 'user' | 'userByEmail' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	allOrthologs?: FieldPolicy<any> | FieldReadFunction<any>,
	allPublications?: FieldPolicy<any> | FieldReadFunction<any>,
	allStrains?: FieldPolicy<any> | FieldReadFunction<any>,
	associatedSequnces?: FieldPolicy<any> | FieldReadFunction<any>,
	content?: FieldPolicy<any> | FieldReadFunction<any>,
	contentBySlug?: FieldPolicy<any> | FieldReadFunction<any>,
	gene?: FieldPolicy<any> | FieldReadFunction<any>,
	generalInformation?: FieldPolicy<any> | FieldReadFunction<any>,
	links?: FieldPolicy<any> | FieldReadFunction<any>,
	listContent?: FieldPolicy<any> | FieldReadFunction<any>,
	listGeneProductInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	listOrders?: FieldPolicy<any> | FieldReadFunction<any>,
	listOrganisms?: FieldPolicy<any> | FieldReadFunction<any>,
	listPermissions?: FieldPolicy<any> | FieldReadFunction<any>,
	listPlasmids?: FieldPolicy<any> | FieldReadFunction<any>,
	listPlasmidsWithAnnotation?: FieldPolicy<any> | FieldReadFunction<any>,
	listRecentGenes?: FieldPolicy<any> | FieldReadFunction<any>,
	listRecentPlasmids?: FieldPolicy<any> | FieldReadFunction<any>,
	listRecentPublications?: FieldPolicy<any> | FieldReadFunction<any>,
	listRecentStrains?: FieldPolicy<any> | FieldReadFunction<any>,
	listRoles?: FieldPolicy<any> | FieldReadFunction<any>,
	listStrains?: FieldPolicy<any> | FieldReadFunction<any>,
	listStrainsWithAnnotation?: FieldPolicy<any> | FieldReadFunction<any>,
	listUsers?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	organism?: FieldPolicy<any> | FieldReadFunction<any>,
	permission?: FieldPolicy<any> | FieldReadFunction<any>,
	plasmid?: FieldPolicy<any> | FieldReadFunction<any>,
	proteinInformation?: FieldPolicy<any> | FieldReadFunction<any>,
	publication?: FieldPolicy<any> | FieldReadFunction<any>,
	refreshToken?: FieldPolicy<any> | FieldReadFunction<any>,
	role?: FieldPolicy<any> | FieldReadFunction<any>,
	strain?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userByEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RoleKeySpecifier = ('createdAt' | 'description' | 'id' | 'name' | 'permissions' | 'updatedAt' | RoleKeySpecifier)[];
export type RoleFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	permissions?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StockKeySpecifier = ('createdAt' | 'createdBy' | 'dbxrefs' | 'depositor' | 'editableSummary' | 'genes' | 'id' | 'inStock' | 'publications' | 'summary' | 'updatedAt' | 'updatedBy' | StockKeySpecifier)[];
export type StockFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	dbxrefs?: FieldPolicy<any> | FieldReadFunction<any>,
	depositor?: FieldPolicy<any> | FieldReadFunction<any>,
	editableSummary?: FieldPolicy<any> | FieldReadFunction<any>,
	genes?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	inStock?: FieldPolicy<any> | FieldReadFunction<any>,
	publications?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrainKeySpecifier = ('characteristics' | 'createdAt' | 'createdBy' | 'dbxrefs' | 'depositor' | 'editableSummary' | 'genes' | 'geneticModification' | 'genotypes' | 'id' | 'inStock' | 'label' | 'mutagenesisMethod' | 'names' | 'parent' | 'phenotypes' | 'plasmid' | 'publications' | 'species' | 'summary' | 'systematicName' | 'updatedAt' | 'updatedBy' | StrainKeySpecifier)[];
export type StrainFieldPolicy = {
	characteristics?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	createdBy?: FieldPolicy<any> | FieldReadFunction<any>,
	dbxrefs?: FieldPolicy<any> | FieldReadFunction<any>,
	depositor?: FieldPolicy<any> | FieldReadFunction<any>,
	editableSummary?: FieldPolicy<any> | FieldReadFunction<any>,
	genes?: FieldPolicy<any> | FieldReadFunction<any>,
	geneticModification?: FieldPolicy<any> | FieldReadFunction<any>,
	genotypes?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	inStock?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	mutagenesisMethod?: FieldPolicy<any> | FieldReadFunction<any>,
	names?: FieldPolicy<any> | FieldReadFunction<any>,
	parent?: FieldPolicy<any> | FieldReadFunction<any>,
	phenotypes?: FieldPolicy<any> | FieldReadFunction<any>,
	plasmid?: FieldPolicy<any> | FieldReadFunction<any>,
	publications?: FieldPolicy<any> | FieldReadFunction<any>,
	species?: FieldPolicy<any> | FieldReadFunction<any>,
	summary?: FieldPolicy<any> | FieldReadFunction<any>,
	systematicName?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedBy?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrainListWithCursorKeySpecifier = ('limit' | 'nextCursor' | 'previousCursor' | 'strains' | 'totalCount' | StrainListWithCursorKeySpecifier)[];
export type StrainListWithCursorFieldPolicy = {
	limit?: FieldPolicy<any> | FieldReadFunction<any>,
	nextCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	previousCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	strains?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('city' | 'country' | 'createdAt' | 'email' | 'firstAddress' | 'firstName' | 'groupName' | 'id' | 'isActive' | 'lastName' | 'organization' | 'phone' | 'roles' | 'secondAddress' | 'state' | 'updatedAt' | 'zipcode' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	groupName?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isActive?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	organization?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	roles?: FieldPolicy<any> | FieldReadFunction<any>,
	secondAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	zipcode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserListKeySpecifier = ('pageNum' | 'pageSize' | 'totalCount' | 'users' | UserListKeySpecifier)[];
export type UserListFieldPolicy = {
	pageNum?: FieldPolicy<any> | FieldReadFunction<any>,
	pageSize?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>,
	users?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithKeySpecifier = ('db' | 'id' | 'name' | WithKeySpecifier)[];
export type WithFieldPolicy = {
	db?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AssociatedSequences?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AssociatedSequencesKeySpecifier | (() => undefined | AssociatedSequencesKeySpecifier),
		fields?: AssociatedSequencesFieldPolicy,
	},
	Auth?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthKeySpecifier | (() => undefined | AuthKeySpecifier),
		fields?: AuthFieldPolicy,
	},
	Author?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthorKeySpecifier | (() => undefined | AuthorKeySpecifier),
		fields?: AuthorFieldPolicy,
	},
	BasePublication?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BasePublicationKeySpecifier | (() => undefined | BasePublicationKeySpecifier),
		fields?: BasePublicationFieldPolicy,
	},
	Citation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CitationKeySpecifier | (() => undefined | CitationKeySpecifier),
		fields?: CitationFieldPolicy,
	},
	Content?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContentKeySpecifier | (() => undefined | ContentKeySpecifier),
		fields?: ContentFieldPolicy,
	},
	DeleteContent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteContentKeySpecifier | (() => undefined | DeleteContentKeySpecifier),
		fields?: DeleteContentFieldPolicy,
	},
	DeletePermission?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeletePermissionKeySpecifier | (() => undefined | DeletePermissionKeySpecifier),
		fields?: DeletePermissionFieldPolicy,
	},
	DeleteRole?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteRoleKeySpecifier | (() => undefined | DeleteRoleKeySpecifier),
		fields?: DeleteRoleFieldPolicy,
	},
	DeleteStock?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteStockKeySpecifier | (() => undefined | DeleteStockKeySpecifier),
		fields?: DeleteStockFieldPolicy,
	},
	DeleteUser?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteUserKeySpecifier | (() => undefined | DeleteUserKeySpecifier),
		fields?: DeleteUserFieldPolicy,
	},
	Download?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DownloadKeySpecifier | (() => undefined | DownloadKeySpecifier),
		fields?: DownloadFieldPolicy,
	},
	DownloadItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DownloadItemKeySpecifier | (() => undefined | DownloadItemKeySpecifier),
		fields?: DownloadItemFieldPolicy,
	},
	Extension?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ExtensionKeySpecifier | (() => undefined | ExtensionKeySpecifier),
		fields?: ExtensionFieldPolicy,
	},
	GOAnnotation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GOAnnotationKeySpecifier | (() => undefined | GOAnnotationKeySpecifier),
		fields?: GOAnnotationFieldPolicy,
	},
	Gene?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GeneKeySpecifier | (() => undefined | GeneKeySpecifier),
		fields?: GeneFieldPolicy,
	},
	GeneralInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GeneralInfoKeySpecifier | (() => undefined | GeneralInfoKeySpecifier),
		fields?: GeneralInfoFieldPolicy,
	},
	GenomicCoordinates?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GenomicCoordinatesKeySpecifier | (() => undefined | GenomicCoordinatesKeySpecifier),
		fields?: GenomicCoordinatesFieldPolicy,
	},
	Identity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IdentityKeySpecifier | (() => undefined | IdentityKeySpecifier),
		fields?: IdentityFieldPolicy,
	},
	Links?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LinksKeySpecifier | (() => undefined | LinksKeySpecifier),
		fields?: LinksFieldPolicy,
	},
	Logout?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LogoutKeySpecifier | (() => undefined | LogoutKeySpecifier),
		fields?: LogoutFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	NameWithLink?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NameWithLinkKeySpecifier | (() => undefined | NameWithLinkKeySpecifier),
		fields?: NameWithLinkFieldPolicy,
	},
	NumberOfPublicationsWithGene?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NumberOfPublicationsWithGeneKeySpecifier | (() => undefined | NumberOfPublicationsWithGeneKeySpecifier),
		fields?: NumberOfPublicationsWithGeneFieldPolicy,
	},
	Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier),
		fields?: OrderFieldPolicy,
	},
	OrderListWithCursor?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderListWithCursorKeySpecifier | (() => undefined | OrderListWithCursorKeySpecifier),
		fields?: OrderListWithCursorFieldPolicy,
	},
	Organism?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrganismKeySpecifier | (() => undefined | OrganismKeySpecifier),
		fields?: OrganismFieldPolicy,
	},
	Orthologs?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrthologsKeySpecifier | (() => undefined | OrthologsKeySpecifier),
		fields?: OrthologsFieldPolicy,
	},
	Permission?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PermissionKeySpecifier | (() => undefined | PermissionKeySpecifier),
		fields?: PermissionFieldPolicy,
	},
	Phenotype?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PhenotypeKeySpecifier | (() => undefined | PhenotypeKeySpecifier),
		fields?: PhenotypeFieldPolicy,
	},
	Plasmid?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlasmidKeySpecifier | (() => undefined | PlasmidKeySpecifier),
		fields?: PlasmidFieldPolicy,
	},
	PlasmidListWithCursor?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PlasmidListWithCursorKeySpecifier | (() => undefined | PlasmidListWithCursorKeySpecifier),
		fields?: PlasmidListWithCursorFieldPolicy,
	},
	ProductInformation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductInformationKeySpecifier | (() => undefined | ProductInformationKeySpecifier),
		fields?: ProductInformationFieldPolicy,
	},
	ProteinGeneralInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProteinGeneralInfoKeySpecifier | (() => undefined | ProteinGeneralInfoKeySpecifier),
		fields?: ProteinGeneralInfoFieldPolicy,
	},
	ProteinInformation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProteinInformationKeySpecifier | (() => undefined | ProteinInformationKeySpecifier),
		fields?: ProteinInformationFieldPolicy,
	},
	Publication?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PublicationKeySpecifier | (() => undefined | PublicationKeySpecifier),
		fields?: PublicationFieldPolicy,
	},
	PublicationWithGene?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PublicationWithGeneKeySpecifier | (() => undefined | PublicationWithGeneKeySpecifier),
		fields?: PublicationWithGeneFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Role?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoleKeySpecifier | (() => undefined | RoleKeySpecifier),
		fields?: RoleFieldPolicy,
	},
	Stock?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StockKeySpecifier | (() => undefined | StockKeySpecifier),
		fields?: StockFieldPolicy,
	},
	Strain?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StrainKeySpecifier | (() => undefined | StrainKeySpecifier),
		fields?: StrainFieldPolicy,
	},
	StrainListWithCursor?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StrainListWithCursorKeySpecifier | (() => undefined | StrainListWithCursorKeySpecifier),
		fields?: StrainListWithCursorFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserListKeySpecifier | (() => undefined | UserListKeySpecifier),
		fields?: UserListFieldPolicy,
	},
	With?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithKeySpecifier | (() => undefined | WithKeySpecifier),
		fields?: WithFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLoginMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ login })
 *   )
 * })
 */
export const mockLoginMutation = (resolver: ResponseResolver<GraphQLRequest<LoginMutationVariables>, GraphQLContext<LoginMutation>, any>) =>
  graphql.mutation<LoginMutation, LoginMutationVariables>(
    'Login',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockLogoutMutation((req, res, ctx) => {
 *   return res(
 *     ctx.data({ logout })
 *   )
 * })
 */
export const mockLogoutMutation = (resolver: ResponseResolver<GraphQLRequest<LogoutMutationVariables>, GraphQLContext<LogoutMutation>, any>) =>
  graphql.mutation<LogoutMutation, LogoutMutationVariables>(
    'Logout',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateContentMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createContent })
 *   )
 * })
 */
export const mockCreateContentMutation = (resolver: ResponseResolver<GraphQLRequest<CreateContentMutationVariables>, GraphQLContext<CreateContentMutation>, any>) =>
  graphql.mutation<CreateContentMutation, CreateContentMutationVariables>(
    'CreateContent',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateContentMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ updateContent })
 *   )
 * })
 */
export const mockUpdateContentMutation = (resolver: ResponseResolver<GraphQLRequest<UpdateContentMutationVariables>, GraphQLContext<UpdateContentMutation>, any>) =>
  graphql.mutation<UpdateContentMutation, UpdateContentMutationVariables>(
    'UpdateContent',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateOrderMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createOrder })
 *   )
 * })
 */
export const mockCreateOrderMutation = (resolver: ResponseResolver<GraphQLRequest<CreateOrderMutationVariables>, GraphQLContext<CreateOrderMutation>, any>) =>
  graphql.mutation<CreateOrderMutation, CreateOrderMutationVariables>(
    'CreateOrder',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockCreateUserMutation((req, res, ctx) => {
 *   const { input } = req.variables;
 *   return res(
 *     ctx.data({ createUser })
 *   )
 * })
 */
export const mockCreateUserMutation = (resolver: ResponseResolver<GraphQLRequest<CreateUserMutationVariables>, GraphQLContext<CreateUserMutation>, any>) =>
  graphql.mutation<CreateUserMutation, CreateUserMutationVariables>(
    'CreateUser',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUpdateUserMutation((req, res, ctx) => {
 *   const { id, input } = req.variables;
 *   return res(
 *     ctx.data({ updateUser })
 *   )
 * })
 */
export const mockUpdateUserMutation = (resolver: ResponseResolver<GraphQLRequest<UpdateUserMutationVariables>, GraphQLContext<UpdateUserMutation>, any>) =>
  graphql.mutation<UpdateUserMutation, UpdateUserMutationVariables>(
    'UpdateUser',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGetRefreshTokenQuery((req, res, ctx) => {
 *   const { token } = req.variables;
 *   return res(
 *     ctx.data({ refreshToken })
 *   )
 * })
 */
export const mockGetRefreshTokenQuery = (resolver: ResponseResolver<GraphQLRequest<GetRefreshTokenQueryVariables>, GraphQLContext<GetRefreshTokenQuery>, any>) =>
  graphql.query<GetRefreshTokenQuery, GetRefreshTokenQueryVariables>(
    'GetRefreshToken',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockContentBySlugQuery((req, res, ctx) => {
 *   const { slug } = req.variables;
 *   return res(
 *     ctx.data({ contentBySlug })
 *   )
 * })
 */
export const mockContentBySlugQuery = (resolver: ResponseResolver<GraphQLRequest<ContentBySlugQueryVariables>, GraphQLContext<ContentBySlugQuery>, any>) =>
  graphql.query<ContentBySlugQuery, ContentBySlugQueryVariables>(
    'contentBySlug',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockContentQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ content })
 *   )
 * })
 */
export const mockContentQuery = (resolver: ResponseResolver<GraphQLRequest<ContentQueryVariables>, GraphQLContext<ContentQuery>, any>) =>
  graphql.query<ContentQuery, ContentQueryVariables>(
    'content',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListNewsContentQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ listContent })
 *   )
 * })
 */
export const mockListNewsContentQuery = (resolver: ResponseResolver<GraphQLRequest<ListNewsContentQueryVariables>, GraphQLContext<ListNewsContentQuery>, any>) =>
  graphql.query<ListNewsContentQuery, ListNewsContentQueryVariables>(
    'ListNewsContent',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListOrganismsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ listOrganisms })
 *   )
 * })
 */
export const mockListOrganismsQuery = (resolver: ResponseResolver<GraphQLRequest<ListOrganismsQueryVariables>, GraphQLContext<ListOrganismsQuery>, any>) =>
  graphql.query<ListOrganismsQuery, ListOrganismsQueryVariables>(
    'ListOrganisms',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockGeneQuery((req, res, ctx) => {
 *   const { gene, limit, sortBy } = req.variables;
 *   return res(
 *     ctx.data({ allStrains, gene, allPublications, allOrthologs, listGeneProductInfo, generalInformation, associatedSequnces, links, proteinInformation })
 *   )
 * })
 */
export const mockGeneQuery = (resolver: ResponseResolver<GraphQLRequest<GeneQueryVariables>, GraphQLContext<GeneQuery>, any>) =>
  graphql.query<GeneQuery, GeneQueryVariables>(
    'Gene',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentGenesQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentGenes })
 *   )
 * })
 */
export const mockListRecentGenesQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentGenesQueryVariables>, GraphQLContext<ListRecentGenesQuery>, any>) =>
  graphql.query<ListRecentGenesQuery, ListRecentGenesQueryVariables>(
    'ListRecentGenes',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPublicationQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ publication })
 *   )
 * })
 */
export const mockPublicationQuery = (resolver: ResponseResolver<GraphQLRequest<PublicationQueryVariables>, GraphQLContext<PublicationQuery>, any>) =>
  graphql.query<PublicationQuery, PublicationQueryVariables>(
    'Publication',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentPublicationsQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentPublications })
 *   )
 * })
 */
export const mockListRecentPublicationsQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentPublicationsQueryVariables>, GraphQLContext<ListRecentPublicationsQuery>, any>) =>
  graphql.query<ListRecentPublicationsQuery, ListRecentPublicationsQueryVariables>(
    'ListRecentPublications',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStrainListQuery((req, res, ctx) => {
 *   const { cursor, limit, filter } = req.variables;
 *   return res(
 *     ctx.data({ listStrains })
 *   )
 * })
 */
export const mockStrainListQuery = (resolver: ResponseResolver<GraphQLRequest<StrainListQueryVariables>, GraphQLContext<StrainListQuery>, any>) =>
  graphql.query<StrainListQuery, StrainListQueryVariables>(
    'StrainList',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListStrainsWithPhenotypeQuery((req, res, ctx) => {
 *   const { cursor, limit, type, annotation } = req.variables;
 *   return res(
 *     ctx.data({ listStrainsWithAnnotation })
 *   )
 * })
 */
export const mockListStrainsWithPhenotypeQuery = (resolver: ResponseResolver<GraphQLRequest<ListStrainsWithPhenotypeQueryVariables>, GraphQLContext<ListStrainsWithPhenotypeQuery>, any>) =>
  graphql.query<ListStrainsWithPhenotypeQuery, ListStrainsWithPhenotypeQueryVariables>(
    'ListStrainsWithPhenotype',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListBacterialStrainsQuery((req, res, ctx) => {
 *   return res(
 *     ctx.data({ listStrainsWithAnnotation, listStrainsWithAnnotation })
 *   )
 * })
 */
export const mockListBacterialStrainsQuery = (resolver: ResponseResolver<GraphQLRequest<ListBacterialStrainsQueryVariables>, GraphQLContext<ListBacterialStrainsQuery>, any>) =>
  graphql.query<ListBacterialStrainsQuery, ListBacterialStrainsQueryVariables>(
    'ListBacterialStrains',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListStrainsInventoryQuery((req, res, ctx) => {
 *   const { cursor, limit } = req.variables;
 *   return res(
 *     ctx.data({ listStrainsWithAnnotation })
 *   )
 * })
 */
export const mockListStrainsInventoryQuery = (resolver: ResponseResolver<GraphQLRequest<ListStrainsInventoryQueryVariables>, GraphQLContext<ListStrainsInventoryQuery>, any>) =>
  graphql.query<ListStrainsInventoryQuery, ListStrainsInventoryQueryVariables>(
    'ListStrainsInventory',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListPlasmidsInventoryQuery((req, res, ctx) => {
 *   const { cursor, limit } = req.variables;
 *   return res(
 *     ctx.data({ listPlasmidsWithAnnotation })
 *   )
 * })
 */
export const mockListPlasmidsInventoryQuery = (resolver: ResponseResolver<GraphQLRequest<ListPlasmidsInventoryQueryVariables>, GraphQLContext<ListPlasmidsInventoryQuery>, any>) =>
  graphql.query<ListPlasmidsInventoryQuery, ListPlasmidsInventoryQueryVariables>(
    'ListPlasmidsInventory',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPlasmidListFilterQuery((req, res, ctx) => {
 *   const { cursor, limit, filter } = req.variables;
 *   return res(
 *     ctx.data({ listPlasmids })
 *   )
 * })
 */
export const mockPlasmidListFilterQuery = (resolver: ResponseResolver<GraphQLRequest<PlasmidListFilterQueryVariables>, GraphQLContext<PlasmidListFilterQuery>, any>) =>
  graphql.query<PlasmidListFilterQuery, PlasmidListFilterQueryVariables>(
    'PlasmidListFilter',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockPlasmidQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ plasmid })
 *   )
 * })
 */
export const mockPlasmidQuery = (resolver: ResponseResolver<GraphQLRequest<PlasmidQueryVariables>, GraphQLContext<PlasmidQuery>, any>) =>
  graphql.query<PlasmidQuery, PlasmidQueryVariables>(
    'Plasmid',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockStrainQuery((req, res, ctx) => {
 *   const { id } = req.variables;
 *   return res(
 *     ctx.data({ strain })
 *   )
 * })
 */
export const mockStrainQuery = (resolver: ResponseResolver<GraphQLRequest<StrainQueryVariables>, GraphQLContext<StrainQuery>, any>) =>
  graphql.query<StrainQuery, StrainQueryVariables>(
    'Strain',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentPlasmidsQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentPlasmids })
 *   )
 * })
 */
export const mockListRecentPlasmidsQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentPlasmidsQueryVariables>, GraphQLContext<ListRecentPlasmidsQuery>, any>) =>
  graphql.query<ListRecentPlasmidsQuery, ListRecentPlasmidsQueryVariables>(
    'ListRecentPlasmids',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockListRecentStrainsQuery((req, res, ctx) => {
 *   const { limit } = req.variables;
 *   return res(
 *     ctx.data({ listRecentStrains })
 *   )
 * })
 */
export const mockListRecentStrainsQuery = (resolver: ResponseResolver<GraphQLRequest<ListRecentStrainsQueryVariables>, GraphQLContext<ListRecentStrainsQuery>, any>) =>
  graphql.query<ListRecentStrainsQuery, ListRecentStrainsQueryVariables>(
    'ListRecentStrains',
    resolver
  )

/**
 * @param resolver a function that accepts a captured request and may return a mocked response.
 * @see https://mswjs.io/docs/basics/response-resolver
 * @example
 * mockUserByEmailQuery((req, res, ctx) => {
 *   const { email } = req.variables;
 *   return res(
 *     ctx.data({ userByEmail })
 *   )
 * })
 */
export const mockUserByEmailQuery = (resolver: ResponseResolver<GraphQLRequest<UserByEmailQueryVariables>, GraphQLContext<UserByEmailQuery>, any>) =>
  graphql.query<UserByEmailQuery, UserByEmailQueryVariables>(
    'UserByEmail',
    resolver
  )
