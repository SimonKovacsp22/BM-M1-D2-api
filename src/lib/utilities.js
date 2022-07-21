import { fileURLToPath } from "url"
import { dirname, join } from "path"
import fs from "fs-extra"

const {readJSON, writeJSON, writeFile } = fs

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")



const publicFolderPath = join(process.cwd(), "./public/img")



const blogPostsJSONPath = join(dataFolderPath, "blogPosts.json")
const authorsJSONPath = join(dataFolderPath, "authors.json")

const blogPostsImgsPath = join(publicFolderPath,"./blogPosts")

const authorsImgsPath = join(publicFolderPath,"./authors")

export const writeBlogPosts =  postsArray => fs.writeJSON(blogPostsJSONPath, postsArray)

export const readBlogPosts = () => fs.readJSON(blogPostsJSONPath)

export const writeAuthors = autArray => fs.writeJSON(authorsJSONPath, autArray)

export const readAuthors = () => fs.readJSON(authorsJSONPath)

export const saveAuthorsAvatar = (fileName, contentAsABuffer) => writeFile(join(authorsImgsPath, fileName), contentAsABuffer)

export const saveBlogPostCover = (fileName, contentAsABuffer) => writeFile(join(blogPostsImgsPath, fileName), contentAsABuffer)

