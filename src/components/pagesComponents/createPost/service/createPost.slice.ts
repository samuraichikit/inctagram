import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type CroppedArea = {
  height: number
  width: number
  x: number
  y: number
}

export type PictureObj = {
  aspectRatio: number
  croppedArea: CroppedArea
  id: number
  img: string
  zoom: number
}

export type CroppedPicture = {
  croppedArea: CroppedArea
  filter: string
  img: string
}

export type FilteredPictureObj = {
  id: string
  img: string
}

export type PicturesIds = Array<{ uploadId: string }>

const initialState = {
  croppedPictures: [] as CroppedPicture[],
  description: '',
  draftedPage: 0,
  filteredPictures: [] as FilteredPictureObj[],
  pictures: [] as PictureObj[],
  picturesIds: [] as PicturesIds,
  stage: 0,
}

export const createPostSlice = createSlice({
  initialState,
  name: 'createPostSlice',
  reducers: {
    removePicture: (state, action: PayloadAction<{ id: PictureObj['id'] }>) => {
      const pictureId = state.pictures.findIndex(pic => pic.id === action.payload.id)
      const removed = state.pictures.splice(pictureId, 1)

      URL.revokeObjectURL(removed[0].img)
    },
    resetState: state => {
      state.pictures.forEach(picObj => URL.revokeObjectURL(picObj.img))

      return initialState
    },
    setAspectRatio: (
      state,
      action: PayloadAction<{ aspect: PictureObj['aspectRatio']; id: PictureObj['id'] }>
    ) => {
      const picId = state.pictures.findIndex(pic => pic.id === action.payload.id)

      if (picId !== -1) {
        state.pictures[picId].aspectRatio = action.payload.aspect
      }
    },
    setCroppedArea: (
      state,
      action: PayloadAction<{ croppedArea: CroppedArea; id: PictureObj['id'] }>
    ) => {
      const pictureId = state.pictures.findIndex(pic => pic.id === action.payload.id)

      state.pictures[pictureId].croppedArea = action.payload.croppedArea
    },
    setCroppedImages: (state, action: PayloadAction<{ croppedImages: string[] }>) => {
      state.croppedPictures = action.payload.croppedImages.map((el, i) => ({
        croppedArea: { ...state.pictures[i].croppedArea },
        filter: 'none',
        img: el,
      }))
    },
    setDescription: (state, action: PayloadAction<{ desc: string }>) => {
      state.description = action.payload.desc
    },
    setDraftedPage: state => {
      state.draftedPage = state.stage
      state.stage = 0
    },
    setFilter: (state, action: PayloadAction<{ filter: string; index: number }>) => {
      if (state.pictures[action.payload.index]) {
        state.croppedPictures[action.payload.index].filter = action.payload.filter
      }
    },
    setFilteredImages: (state, action: PayloadAction<{ filteredImages: string[] }>) => {
      state.filteredPictures = action.payload.filteredImages.map(el => ({
        id: String(getRandomId()),
        img: el,
      }))
    },
    setNextStage: state => {
      state.stage += 1
    },
    setPictures: (state, action: PayloadAction<{ pictures: string[] }>) => {
      const newPictureObjs: PictureObj[] = action.payload.pictures.map(pic => ({
        aspectRatio: 4 / 3,
        croppedArea: { height: 0, width: 0, x: 0, y: 0 },
        filter: 'none',
        id: getRandomId(),
        img: pic,
        zoom: 1,
      }))

      state.pictures = state.pictures.concat(newPictureObjs)
    },
    setPicturesIds: (state, action: PayloadAction<{ uploadId: string }>) => {
      debugger
      state.picturesIds.push(action.payload)
    },
    setPrevStage: state => {
      state.stage -= 1
    },
    setStageFromDraft: state => {
      state.stage = state.draftedPage
    },
    setZoom: (state, action: PayloadAction<{ id: PictureObj['id']; zoom: PictureObj['zoom'] }>) => {
      const pictureId = state.pictures.findIndex(pic => pic.id === action.payload.id)

      if (pictureId !== -1) {
        state.pictures[pictureId].zoom = action.payload.zoom
      }
    },
  },
})

export const {
  removePicture,
  resetState,
  setAspectRatio,
  setCroppedArea,
  setCroppedImages,
  setDescription,
  setDraftedPage,
  setFilter,
  setFilteredImages,
  setNextStage,
  setPictures,
  setPicturesIds,
  setPrevStage,
  setStageFromDraft,
  setZoom,
} = createPostSlice.actions

export const getRandomId = (): number => {
  return Math.round(Math.random() * 1000000)
}
