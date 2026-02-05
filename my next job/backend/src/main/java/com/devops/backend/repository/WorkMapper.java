package com.devops.backend.repository;

/*יצרתי מחלקה שלא למדנו בכיתה  מחלקה זו מזריקה getter setter בתוך פונקציות שעשיתי מימוש במקום שאני יכתוב אותם (זו בקיצור אחלה מחלקה)*/

import com.devops.backend.dto.WorkRequest;
import com.devops.backend.model.Work;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")//פה אנחנו אומרים שאנחנו עובדים אם string
public interface WorkMapper {
    Work toEntity(WorkRequest dto);
    void updateEntityFromDto(WorkRequest dto, @MappingTarget Work entity);// @MappingTarget כדי שיעתיק את הנתונים  new
}
