export const createImageElement = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const imageObj = new Image()

    imageObj.addEventListener('load', () => resolve(imageObj))
    imageObj.addEventListener('error', error => reject(error))
    imageObj.setAttribute('crossOrigin', 'anonymous')
    imageObj.src = src
  })
