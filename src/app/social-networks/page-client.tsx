'use client'

import { useState, useRef } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { API } from '@/api/client'

import { CreateButton } from '@/components/Buttons/Create'
import { UpdateButton } from '@/components/Buttons/Update'
import { DeleteButton } from '@/components/Buttons/Delete'
import { Table, Thead, Th, Tbody, Tr, Td } from '@/components/Table'
import { Modal } from '@/components/Modal'
import { Form } from '@/components/Form'

import { SocialNetworkI } from './interfaces'


const schema = z.object({
  id: z.number().nullable(),
  url: z.string(),
  icon: z.string(),
  show_header: z.boolean(),
  show_footer: z.boolean(),
})


const socialNetworkOptions: string[] = ['linkedin', 'github', 'gitlab', 'twitter', 'instagram']

export default function SocialNetworksClient({ socialNetworks }: { socialNetworks: SocialNetworkI[] }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const [socialNetworksData, setSocialNetworks] = useState(socialNetworks)

  const modalRef = useRef<HTMLDialogElement>(null)

  const openModal = (socialNetwork: SocialNetworkI | null = null) => {
    setValue('id', socialNetwork ? socialNetwork.id : null)
    setValue('url', socialNetwork ? socialNetwork.url : '')
    setValue('icon', socialNetwork ? socialNetwork.icon : '')
    setValue('show_header', socialNetwork ? socialNetwork.show_header : false)
    setValue('show_footer', socialNetwork ? socialNetwork.show_footer : false)

    modalRef.current?.showModal()
  }

  const onFormSubmit = async (formData: any) => {
    const { id, ...payload } = formData

    const response = !!id ? await API.put(`/social_networks/${id}`, formData) : await API.post('/social_networks', payload)
    const data: SocialNetworkI[] = await response.json()

    setSocialNetworks(data)
    modalRef.current?.close()
  }

  const handlerDeleteButton = async (id: number) => {
    const response = await API.delete(`/social_networks/${id}`)
    const data: SocialNetworkI[] = await response.json()

    setSocialNetworks(data)
  }

  return (
    <>
      <div className='my-10 md:w-3/5'>
        <Table>
          <Thead>
            <Th>Rede Social</Th>

            <Th className='flex justify-end'>
              {API.hasToken() && <CreateButton onClick={() => openModal()} />}
            </Th>
          </Thead>
          <Tbody>
            {socialNetworksData.map((socialNetwork, i) => (
              <Tr key={`social-network-${i}`}>
                <Td>
                  <a href={socialNetwork.url} className='link-hover hover:cursor-pointer'>{socialNetwork.icon.toUpperCase()}</a>
                </Td>
                <Td className='flex justify-end'>
                  {
                    API.hasToken() &&
                    <>
                      <UpdateButton onClick={() => openModal(socialNetwork)} />
                      <DeleteButton onClick={() => handlerDeleteButton(socialNetwork.id)} />
                    </>
                  }
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>

      <Modal modalRef={modalRef}>
        <Form onSubmit={handleSubmit(onFormSubmit)}>
          <label>Selecione uma rede social:</label>
          <select {...register("icon")} className="select">
            <option disabled defaultChecked>Selecione</option>

            {socialNetworkOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <input {...register('url')} placeholder='URL' className='input' />
          {errors.url && <p>{errors.url.message}</p>}

          <div className='flex flex-row gap-10'>
            <label className="fieldset-label">
              <input {...register('show_header')} type="checkbox" className="checkbox" />
              mostrar no header
            </label>

            <label className="fieldset-label">
              <input {...register('show_footer')} type="checkbox" className="checkbox" />
              mostrar no footer
            </label>
          </div>
        </Form>
      </Modal>
    </>
  )
}
