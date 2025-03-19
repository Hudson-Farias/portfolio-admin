'use client'

import { useState, useRef } from 'react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { FaPencil } from 'react-icons/fa6'
import { FaPlus } from 'react-icons/fa'

import { API } from '@/api/client'
import { DeleteButton } from '@/components/DeleteButton'
import { Modal } from '@/components/Modal'

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
        <table className='table table-lg bg-base-300'>
          <thead>
            <th>Rede Social</th>

            <th className='flex justify-end'>
              {API.hasToken() && <button className='btn btn-ghost' onClick={() => openModal()}><FaPlus /></button>}
            </th>
          </thead>
          <tbody>
            {socialNetworksData.map((socialNetwork, i) => (
              <tr className='hover:bg-base-200' key={`social-network-${i}`}>
                <td>
                  <a href={socialNetwork.url} className='text-xs font-semibold opacity-60'>{socialNetwork.icon.toUpperCase()}</a>
                </td>
                <td className='flex justify-end'>
                  {
                    API.hasToken() &&
                    <>
                      <button className='btn btn-ghost' onClick={() => openModal(socialNetwork)}><FaPencil /></button>
                      <DeleteButton onClick={() => handlerDeleteButton(socialNetwork.id)} />
                    </>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal modalRef={modalRef}>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit(onFormSubmit)}>
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

          <div className='modal-action'>
            <button className='btn btn-ghost' type='submit'>Enviar</button>
          </div>
        </form>
      </Modal>
    </>
  )
}
