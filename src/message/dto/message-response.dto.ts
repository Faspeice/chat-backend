
export class MessageSenderDto {

  id: number;


  username: string;
}

export class MessageResponseDto {

  id: number;


  content: string;


  sentAt: Date;


  sender: MessageSenderDto;
}