import GoogleStrategy from 'passport-google-oauth20'
import AuthorModel from '../apis/authors/authorsModel.js'
import { createAccessToken } from './tokenTools.js'

const googleStrategy = new GoogleStrategy({
    clientID:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL:process.env.GOOGLE_REDIRECT_URL

},async (__, ___, profile, passportNext )=>{
     console.log("PROFILE:", profile)
    try {

    const author =await AuthorModel.findOne({email: profile._json.email})

    if(author) {
          const accessToken = await createAccessToken({_id: author._id, role: author.role})

          passportNext(null,{ accessToken })
    } else {

        const { given_name, family_name, picture, email} = profile._json
        const newAuthor = new AuthorModel({
            name: given_name,
            surname: family_name,
            avatar: picture,
            email,
            googleID: profile.id
        })

        console.log("newAuthor:", newAuthor)
        const createdAuthor = await newAuthor.save()

        createAccessToken({ _id: createdAuthor._id, role: createdAuthor.role })

        passportNext(null, { accessToken })
    }
        
    } catch (error) {
        
    }
})

export default googleStrategy