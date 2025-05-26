import OpenAI from 'openai'

export class EmbeddingService {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  async createEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text,
        encoding_format: 'float',
      })

      return response.data[0].embedding // Assuming the response structure
    } catch (error) {
      console.error('Error creating embedding:', error)
      throw new Error('Failed to create embedding')
    }
  }

  async chat(message: string) {
    try {
      const response = await this.openai.responses.create({
        model: 'gpt-3.5-turbo',
        input: message,
      })

      return response.output_text
    } catch (error) {
      console.error('Error in chat:', error)
      throw new Error('Failed to process chat message')
    }
  }
}
