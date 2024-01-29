import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {ArticleService} from "../../services/article.service";
import {AuthService} from "../../auth.service";
import {ToastrService} from "ngx-toastr";
import { Subscription} from "rxjs";

@Component({
    selector: 'app-article-detail',
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
    article: any;
    newComment: string = '';
    comments: string[] = []; // Array to store comments
    userRating: number = 5;
    selectedRating: number = 0;
    commentsToShow :number =3 ;
     private streamSubscription!: Subscription;
  isModifying = false; // Boolean variable to track whether modification mode is active
    likesCount! : number  ;



    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private router: Router,
        public authservice : AuthService,
        private toastr : ToastrService,

    ) {}

    ngOnInit(): void {
        this.article = { likes: 0, dislikes: 0 };
        const articleIdParam = this.route.snapshot.paramMap.get('id');
        this.getComments();
        if (articleIdParam) {
            const articleId = +articleIdParam;
            const user = this.authservice.getUser(this.authservice.getToken())
            console.log("hana article detail")
            if(user && articleIdParam){
                const idUser = user.id ;
                //console.log(idUser);
                console.log(+articleIdParam);
                this.articleService.getNote(+articleIdParam,+idUser).subscribe(
                    (note) => {
                        // Assuming the API returns an array of notes, and you need the first one.
                        this.userRating = note.length ? note[0].note : 0;
                        this.selectedRating = this.userRating; // Initialize the rating stars
                    },
                    (error) => {
                        console.error('Error fetching user note:', error);
                        this.userRating = 0;
                        this.selectedRating = 0;
                    }
                );
                this.articleService.getComments(articleId);
                this.articleService.fetchArticleData(articleId).subscribe(
                    (data) => {
                        this.article = data;
                    },
                    (error) => {
                        console.error('Error fetching article data:', error);
                        // Handle the error or navigate to an error page
                    }
                );
            } else {
                // Handle the null case
                this.router.navigate(['/error']);
            }
            if (this.article.likes === undefined) {
                this.article.likes = 0;
            }
            if (this.article.dislikes === undefined) {
                this.article.dislikes = 0;
            }
        }
    }




    incrementLikes(): void {
        this.article.likes++;
    }

    incrementDislikes(): void {
        this.article.dislikes++;
    }

    toggleLike() {
        const articleIdParam = this.route.snapshot.paramMap.get('id');
        const user = this.authservice.getUser(this.authservice.getToken())
        //console.log("user",user?.id)
        if(user && articleIdParam){
            const idUser = user.id ;
            //console.log("ena l id hehe",idUser)
            this.articleService.addLike(+articleIdParam, +idUser).subscribe(
                (response) => {
                    if (!this.article.liked) {
                        this.article.likes++;
                        if (this.article.disliked) {
                            this.article.dislikes--;
                        }
                    } else {
                        this.article.likes--;
                    }
                    this.article.liked = !this.article.liked;
                    this.article.disliked = this.article.liked ? false : this.article.disliked;
                });
        }
    }

    toggleLike1() {
        const articleIdParam = this.route.snapshot.paramMap.get('id');
        const user = this.authservice.getUser(this.authservice.getToken());

        if (user && articleIdParam) {
            const idUser = user.id;

            // Utilisez la fonction addLike pour ajouter le like
            this.articleService.addLike(+articleIdParam, +idUser).subscribe(
                () => {
                    //  obtenir le nombre de likes mis à jour
                    this.articleService.getLikes(+articleIdParam).subscribe(
                        (likesCount) => {
                            console.log('Likes count after like added:', likesCount);

                            // Mettez à jour les compteurs de likes et dislikes
                            if (!this.article.liked) {
                                this.article.likes = likesCount;
                                if (this.article.disliked) {
                                    this.article.dislikes--;
                                }
                            } else {
                                // Si déjà liké, le nouveau like est en réalité un dislike
                                this.article.likes--;
                            }

                            // Inversez le statut liked/disliked
                            this.article.liked = !this.article.liked;
                            this.article.disliked = this.article.liked ? false : this.article.disliked;

                        },
                        (error) => {
                            console.error('Erreur lors de la demande de likes après ajout :', error);
                        }
                    );
                },
                (error) => {
                    console.error('Erreur lors de l\'ajout de like :', error);
                }
            );
        }
    }

// toggleDislike function
    toggleDislike() {
        const articleIdParam = this.route.snapshot.paramMap.get('id');
        const user = this.authservice.getUser(this.authservice.getToken());

        if (user && articleIdParam) {
            const idUser = user.id;

            // Utilisez la fonction adddisLike pour ajouter le dislike
            this.articleService.adddisLike(+articleIdParam, +idUser).subscribe(
                (response) => {
                    // obtenir le nombre de likes mis à jour
                    this.articleService.getDislikes(+articleIdParam).subscribe(
                        (dislikesCount) => {
                            console.log('Likes count after dislike added:', dislikesCount);

                            // Mettez à jour les compteurs de likes et dislikes
                            if (!this.article.disliked) {
                                this.article.dislikes = dislikesCount;
                                if (this.article.liked) {
                                    this.article.likes--;
                                }
                            } else {
                                // Si déjà disliké, le nouveau dislike est en réalité un like
                                this.article.dislikes--;
                            }

                            // Inversez le statut liked/disliked
                            this.article.disliked = !this.article.disliked;
                            this.article.liked = this.article.disliked ? false : this.article.liked;
                        },
                        (error) => {
                            console.error('Erreur lors de la demande de likes après ajout de dislike:', error);
                        }
                    );
                }
            );
        }
    }

    addComment(): void {
      //console.log("ena l comment",this.newComment)
      const articleIdParam = this.route.snapshot.paramMap.get('id');
      const user = this.authservice.getUser(this.authservice.getToken());
      console.log("ena user " , user)
      //console.log("user",user?.id)
      if(user && articleIdParam){
       const idUser = user.id ;
       //console.log("ena l id hehe",idUser)
        this.articleService.addcomment(this.newComment,+articleIdParam,+idUser).subscribe(
          (response) =>{
            this.toastr.success("commentaire ajouté avec succès");
            this.getComments()
          },
          (error)=>{
            this.toastr.error("Erreur lors de l'ajout");
          }
        );
      }

      this.newComment = '';
      //this.getComments()

    }


    setRating(rating: number): void {
        if (this.selectedRating === rating) {
            // If the user clicks the same star again, reset the rating
            this.selectedRating = 0;
        } else {
            // Update the selected rating
            this.selectedRating = rating;
        }
    }


    getComments2() {
      const articleIdParam = this.route.snapshot.paramMap.get('id');
      if(articleIdParam){
        this.articleService.getComments(+articleIdParam).subscribe(
          (data) =>{
              for (let pas = 0; pas < data.length; pas++) {
                //console.log("ena data hehe",data)
                //console.log("ena data[pas]",data[pas].id_user)
                this.authservice.getUserbyId(data[pas].id_user).subscribe(
                  (response) =>{
                    //console.log("id " ,data[pas].id_user) //shih
                   // console.log("username",response[data[pas].id_user].username)
                   // console.log("response",response[pas].username)
                   //console.log("ena username",response[pas]);
                    //console.log("ena l commentaire mte3ou " ,data[pas].commentaire )
                    const comment = "Username " + response[(data[pas].id_user) - 1].username + " - " + data[pas].commentaire;
                    this.comments.unshift(comment)
                  },
                  (error)=>{
                    this.toastr.error("Erreur getting comments")

                  }
                );
                //unshift afin d'afficher les récents commentaires au début
                // Manually trigger change detection
               // console.log("username" +user.username + " commentaire" + data[pas].commentaire)
              }

          },
          (error)=>{
            this.toastr.error("Erreur getting comments")
          }
        );
      }
    }



  deleteArticle() {
    const articleIdParam = this.route.snapshot.paramMap.get('id');
    if(articleIdParam){
      console.log("hello ena f delete")
      this.articleService.DeleteArticle(+articleIdParam).subscribe(
        (response)=>{
          console.log(response)
          this.toastr.success("Deleted successfully")
          this.router.navigate(['/articles']);

        },
        (error)=>{
          this.toastr.error("Error deleting")
        }
      )

    }
  }





  getComments() {
    const articleIdParam = this.route.snapshot.paramMap.get('id');

    if (articleIdParam) {
      this.comments =[];
      this.articleService.getComments(+articleIdParam).subscribe(
        (data) => {
        //  console.log(data)
          // Start processing comments sequentially
          this.processCommentsOnebyOne(data, 0);

        },
        (error) => {
          this.toastr.error("Erreur getting comments");
        }
      );
    }
  }

  processCommentsOnebyOne(data: any[], index: number) {
    if (index < data.length) {
      const comment = data[index];
      console.log("ena id taa user ",comment.id_user);
      this.authservice.getUserbyId(comment.id_user).subscribe(
        (response) => {
          //amalna -1 khater tab fih decalage taa id donc na9sou 1 bch njiw bethabt
          //response[0] atana l usrname taa id 1

          const username = response[(comment.id_user)].username;
          //const username = response[7].username ;
          console.log("salut username",username)
          const commentText = ` ${username} :  ${comment.commentaire}`;
          this.comments.unshift(commentText);

          // Process the next comment
          this.processCommentsOnebyOne(data, index + 1);
        },
        (error) => {
          this.toastr.error("Erreur getting comments");

          // Skip to the next comment even if there's an error
          this.processCommentsOnebyOne(data, index + 1);
        }
      );
    } else {
      // All comments processed
      // Additional actions if needed after processing all comments
    }
  }
 /* processCommentsOnebyOne(data: any[], index: number) {
    if (index < data.length) {
      const comment = data[index];
      // console.log("ena id taa user ", comment.id_user);
      this.authservice.getUserbyId(comment.id_user).subscribe(
        (response) => {
          // amalna -1 khater tab fih decalage taa id donc na9sou 1 bch njiw bethabt
          // response[0] atana l usrname taa id 1
          console.log(response)
          const user = response.find(user => user.id === comment.id_user);
          const username = user ? user.username : 'Unknown User';
          // console.log("salut username", username)
          const commentText = `${username}: ${comment.commentaire}`;
          this.comments.unshift(commentText);

          // Process the next comment
          this.processCommentsOnebyOne(data, index + 1);
        },
        (error) => {
          this.toastr.error("Erreur getting comments");

          // Skip to the next comment even if there's an error
          this.processCommentsOnebyOne(data, index + 1);
        }
      );
    } else {
      // All comments processed
      // Additional actions if needed after processing all comments
    }
  }
*/

  /*************** section Modify *********************/

  modifyArticle(): void {
    this.isModifying = true;
  }

  saveModification(): void {
    // Implement logic to save the modified description
    // You can use this.modifiedDescription to get the modified value
    const articleIdParam = this.route.snapshot.paramMap.get('id');
    if(articleIdParam){
    this.articleService.ModifyArticle(+articleIdParam,this.article.title,this.article.description).subscribe(
      (response)=>{
        console.log("modified title");
      },
      (error)=>{
        console.log("hhehe ghalet")
      }
    )


  }
    this.isModifying = false;

  }

  cancelModification(): void {
    this.isModifying = false;
  }

  /*************** section Modify *********************/




  loadMoreComments() {
    this.commentsToShow += 3; // Augmentez le nombre de commentaires à afficher lors du clic sur "Show more"
  }
  showLessComments() {
    this.commentsToShow = 3; // Réinitialisez le nombre de commentaires à afficher lors du clic sur "Show less"
  }




  deleteComment(comment : string){}
  modifyComment(comment : string){}
}
