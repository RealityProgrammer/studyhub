package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartEntity,Long> {
    @Query("select c from CartEntity c where c.account.email =:email and c.id =:cartId and c.account.deleted = false ")
    Optional<CartEntity> findByEmailAndCartId(String email,Long cartId);

    @Query("select c from CartEntity c where c.account.email =:email and c.account.deleted = false ")
    List<CartEntity> findByEmail(String email);

    @Query("select c from CartEntity c where c.account.email =:email and c.course.id =:courseId and c.account.deleted = false ")
    Optional<CartEntity> findByEmailAndCourseId(String email, Long courseId);

}
