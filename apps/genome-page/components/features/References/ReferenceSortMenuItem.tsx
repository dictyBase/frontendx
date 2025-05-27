import { MenuItem, MenuItemProps } from "@material-ui/core"
import { Ord, contramap, reverse as ORDreverse } from "fp-ts/Ord"
import { ListPublicationsWithGeneQuery } from "dicty-graphql-schema"

type PublicationWithGene =
  ListPublicationsWithGeneQuery["listPublicationsWithGene"][0]

interface IMenuItemProperties extends MenuItemProps {
  optionValue: Array<[string, Ord<PublicationWithGene>]>
}

const ReferenceSortMenuItem = ({
  children,
  optionValue,
  ...rest
}: IMenuItemProperties) => <MenuItem {...rest}>{children}</MenuItem>
