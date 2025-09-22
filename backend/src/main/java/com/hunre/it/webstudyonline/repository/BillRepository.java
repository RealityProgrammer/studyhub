package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.BillEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<BillEntity,Long> {
    @Query(value = "SELECT b FROM BillEntity b WHERE b.deleted=false ")
    Page<BillEntity> findAllByDeletedFalse(Pageable pageable);
    @Query(value = "SELECT b FROM BillEntity b WHERE b.deleted=false AND b.accountEntity.email=:email")
    Page<BillEntity> findAllByEmail(String email,Pageable pageable);
    @Query(value = "SELECT b FROM BillEntity b WHERE b.deleted=false " +
            "AND (:code IS NULL OR b.code LIKE %:code%)" +
            "AND (:accountName IS NULL OR b.accountEntity.fullname LIKE %:accountName%)")
    Page<BillEntity> findBillByCodeAndAccountName(String code, String accountName, Pageable pageable);
    @Query(value = "SELECT COUNT(o) > 0 FROM BillEntity o WHERE o.accountEntity.email=:email")
    boolean checkBill(String email);
}
