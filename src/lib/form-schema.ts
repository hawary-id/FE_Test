import { z } from "zod"

export const roadFormSchema = z.object({
    unit_id: z.string({required_error: 'Unit harus dipilih'}),
    ruas_name: z.string({required_error: 'Ruas harus diisi'}),
    long: z.string({required_error: 'Panjang harus diisi'}),
    km_awal: z.string({required_error: 'KM awal harus diisi'}),
    km_akhir: z.string({required_error: 'KM akhir harus diisi'}),
    status: z.string({required_error: 'Status harus diisi'}),
    photo: z.string({required_error: 'Foto harus diisi'}),
    file: z.string({required_error: 'Dokumen harus diisi'}),
})

export const signInFormSchema = z.object({
    username: z.string({required_error: 'username harus dipilih'}),
    password: z.string({required_error: 'Password harus diisi'}),
})