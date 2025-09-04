// TODO: @lucky update the folder for team images
const NEW_ABOUT_LINK = "https://res.cloudinary.com/dsk0fzyho/image/upload";
const IIIT_DWD_ABOUT_ASSET = {
    yogeshgauda_PhotoURL: `${NEW_ABOUT_LINK}/v1735143899/yogeshgauda_db7a4k.png`,
    yogesh_PhotoURL: `${NEW_ABOUT_LINK}/v1735143899/yogesh_yg3a26.png`,
    vishesh_PhotoURL: `${NEW_ABOUT_LINK}/v1735143898/vishesh_nqqznr.png`,
    varshit_PhotoURL: `${NEW_ABOUT_LINK}/v1735143896/varshit_d69m95.png`,
    shardendu_PhotoURL: `${NEW_ABOUT_LINK}/v1735143894/shardendu_wzymxz.png`,
    harshit_PhotoURL: `${NEW_ABOUT_LINK}/v1735143894/harshit_ggebzj.png`,
    saisha_PhotoURL: `${NEW_ABOUT_LINK}/v1735143895/saisha_zq6gdl.png`,
    shivambu_PhotoURL: `${NEW_ABOUT_LINK}/v1735143895/shivambu_tzuala.png`,
    bikram_PhotoURL: `${NEW_ABOUT_LINK}/v1735143894/bikram_sqykum.png`,
    arunodaya_PhotoURL: `${NEW_ABOUT_LINK}/v1735143894/arunodaya_pycukv.png`,
    abhilash_PhotoURL: `${NEW_ABOUT_LINK}/v1735143893/abhilash_llvquf.png`,
    anas_PhotoURL: `${NEW_ABOUT_LINK}/v1735143893/anas_c6etc4.png`,
};

const vidkaryaChapters = {
    "IIIT-Dharwad": {
        vision: "Vidkarya envisions IIIT Dharwad as a vibrant hub where students easily access resources, collaborate on open-source projects, and grow through industry mentorship. Through hands-on experiences and personalized guidance, we transform passionate learners into skilled professionals. We strive to empower every student, ensuring each feature of Vidkarya creates meaningful impact in their academic and professional journey.",
        clubPresident: [
            { name: "Shivambu Dev Pandey", role: "Chapter Lead", photoURL: IIIT_DWD_ABOUT_ASSET.shivambu_PhotoURL }
        ],
        techTeam: [
            { name: "Anas Khan", role: "Software Developer", photoURL: IIIT_DWD_ABOUT_ASSET.anas_PhotoURL },
            { name: "Shardendu Mishra", role: "Software Developer", photoURL: IIIT_DWD_ABOUT_ASSET.shardendu_PhotoURL },
            { name: "Yogeshgauda Patil", role: "Software Developer", photoURL: IIIT_DWD_ABOUT_ASSET.yogeshgauda_PhotoURL },
            { name: "Vishesh Dwiwedi", role: "Software Developer", photoURL: IIIT_DWD_ABOUT_ASSET.vishesh_PhotoURL }
        ],
        alumniTeam: [
            { name: "Abhilash", role: "Alumni Liaison", photoURL: IIIT_DWD_ABOUT_ASSET.abhilash_PhotoURL },
            { name: "Harshit", role: "Alumni Liaison", photoURL: IIIT_DWD_ABOUT_ASSET.harshit_PhotoURL },
            { name: "Arunodaya", role: "Alumni Liaison", photoURL: IIIT_DWD_ABOUT_ASSET.arunodaya_PhotoURL },
            { name: "Varshith", role: "Alumni Liaison", photoURL: IIIT_DWD_ABOUT_ASSET.varshit_PhotoURL }
        ],
        contentTeam: [
            { name: "Yogesh", role: "Content Moderator", photoURL: IIIT_DWD_ABOUT_ASSET.yogesh_PhotoURL },
            { name: "Bikram", role: "Content Moderator", photoURL: IIIT_DWD_ABOUT_ASSET.bikram_PhotoURL },
            { name: "Saisha", role: "Content Moderator", photoURL: IIIT_DWD_ABOUT_ASSET.saisha_PhotoURL }
        ]
    }
}

export { vidkaryaChapters }