export async function fetchHelpTopics(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Не удалось загрузить XML')
  }

  const xmlText = await response.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlText, 'application/xml')

  const errorNodes = doc.getElementsByTagName('parsererror')
  if (errorNodes.length > 0) {
    throw new Error('XML не удалось распарсить')
  }

  const nodes = doc.getElementsByTagName('topic')
  const topics = []

  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i]
    const id = node.getAttribute('id') || ''

    const titleNode = node.querySelector('title')
    const descNode = node.querySelector('description')
    const longNode = node.querySelector('longDescription')
    const urlNode = node.querySelector('materialUrl')

    let title = ''
    if (titleNode && titleNode.textContent) {
      title = titleNode.textContent.trim()
    }

    let description = ''
    if (descNode && descNode.textContent) {
      description = descNode.textContent.trim()
    }

    let longDescription = ''
    if (longNode && longNode.textContent) {
      longDescription = longNode.textContent.trim()
    }

    if (longDescription === '') {
      longDescription = description
    }

    let materialUrl = ''
    if (urlNode && urlNode.textContent) {
      materialUrl = urlNode.textContent.trim()
    }

    if (title === '') {
      title = id
    }

    topics.push({
      id: id,
      title: title,
      description: description,
      longDescription: longDescription,
      materialUrl: materialUrl,
    })
  }

  return topics
}
