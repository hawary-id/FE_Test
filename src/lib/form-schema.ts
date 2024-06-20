import { z } from "zod"

export const roadFormSchema = z.object({
    unit_id: z.string({required_error: 'Unit harus dipilih'}),
    ruas_name: z.string({required_error: 'Ruas harus diisi'}),
    long: z.string({required_error: 'Panjang harus diisi'}),
    km_awal: z.string({required_error: 'KM awal harus diisi'}),
    km_akhir: z.string({required_error: 'KM akhir harus diisi'}),
    status: z.string({required_error: 'Status harus diisi'}),
    photo: z.instanceof(File).refine((file) => file.size <= 2 * 1024 * 1024, {
      message: "Ukuran file harus maksimal 2MB",
    }).refine((file) => file !== undefined, {
      message: "Foto harus diunggah",
    }),
    file: z.instanceof(File).refine((file) => file.size <= 2 * 1024 * 1024, {
        message: "Ukuran file harus maksimal 2MB",
      }).refine((file) => file !== undefined, {
        message: "Dokumen harus diunggah",
      }),
})

export const signInFormSchema = z.object({
    username: z.string({required_error: 'username harus diisi'}),
    password: z.string({required_error: 'Password harus diisi'}),
})