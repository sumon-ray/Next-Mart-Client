"use server"
import { cookies } from "next/headers";
const createCategory =async (data: FormData) => {
   try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/category`,{
        method: "POST",
        headers: {
            Authorization: (await cookies()).get("accessToken")!.value
        },
        body: data
    })

    return res.json()
   } catch (error:any) {
    return Error(error)
   }
};

export default createCategory;

