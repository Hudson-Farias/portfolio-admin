import { API } from '@/api'

import { SocialNetworkI } from './interfaces'
import SocialNetworksClient from './page-client'

export default async function SocialNetworks() {
  const response = await API.get('/social_networks')
  const experiences: SocialNetworkI[] = await response.json()

  return <SocialNetworksClient socialNetworks={experiences} />
}
