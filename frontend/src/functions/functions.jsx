
export const showDate = (noteObj, labelIdx) => {

  const today = new Date()
  const oneDay = 24 * 60 * 60 * 1000
  const editedDate = new Date(noteObj.edited)
  const createdDate = new Date(noteObj.created)

  if (labelIdx === 3){
    const dayCount = Math.round(Math.abs((today - editedDate)/oneDay))
    if(dayCount < 8) {
      return (`Edited ${dayCount} days ago`)
    } else return (`Edited on ${noteObj.edited}`) 
  }else{
    const dayCount = Math.round(Math.abs((today - createdDate)/oneDay))
    if(dayCount < 8) {
      return (`Created ${dayCount} days ago`)
    } else return (`Created on ${noteObj.created}`) 
  }
}

export const highlightMatch = (searchTerms, text) => {  
  searchTerms.map(searchTerm =>{
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('\\b' + escapedTerm + '\\b', 'gi');
    if (searchTerm !== '') {
      text = text.replace(regex, m => '<mark style="background-color: yellow;">' + m + '</mark>');
    }
  })
    return ( text )
}

export const refreshPage = () => {
  window.location.reload();
} 

export const switchHandler = (savedColorMode) =>{
  if(savedColorMode === 'undefined' ){
    localStorage.setItem('lightColorMode', true)
  }else if(savedColorMode === 'true'){
    localStorage.setItem('lightColorMode', false)
  }else{
    localStorage.setItem('lightColorMode', true)
  }
  refreshPage()
}