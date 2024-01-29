export interface Article{
    id : number ;
    title : string;
    description : string;
  likes?: number;
  dislikes?: number;
  // Other properties as needed

  dislikePercentage?: number;
  likePercentage?: number;
  gnote?: number;
  // Other properties as needed
}
