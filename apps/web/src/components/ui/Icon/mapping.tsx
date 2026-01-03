import {
  LoadingIcon,
  PhoneIcon,
  PhoneOutlinedIcon,
  MenuIcon,
  CloseIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  UserIcon,
  EmailIcon,
  HeartFilledIcon,
  HeartOutlinedIcon,
  AlignIcon,
  SoulIcon,
  EnergyIcon
} from '../icons'

const IconMapping = {
  loading: <LoadingIcon />,
  phone: <PhoneIcon />,
  phoneOutlined: <PhoneOutlinedIcon />,
  menu: <MenuIcon />,
  close: <CloseIcon />,
  linkedin: <LinkedinIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  user: <UserIcon />,
  email: <EmailIcon />,
  heartFilled: <HeartFilledIcon />,
  heartOutlined: <HeartOutlinedIcon />,
  align: <AlignIcon />,
  soul: <SoulIcon />,
  energy: <EnergyIcon />
}

type AvailableIcons = keyof typeof IconMapping

export { IconMapping }
export type { AvailableIcons }
