package com.devops.backend.dto;
/*יצרתי את המחלקה הזאת בגלל שהטבלה יש שם שדות שאני לא רוצה לשלוח לכן עשיתי מחלקת עזר*/
/* בזכות message בכל שגיאה שאני יקבל יקפוץ לי למה קיבלתי שגיאה כדי שאוכל לתקן ולא להשתגע לחפש מה השגיאה*/
import com.devops.backend.model.Work;
import com.devops.backend.repository.WorkMapper;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkRequest {
    @NotBlank
    @Size(min =1,max =50,message = "שם השדה הוא חובה(עד חמישים תווים)")
    private String name;
    @NotBlank
    @Size(min =10,max = 500,message = "ביאור הוא שדה חובה")
    private String description;
    @NotNull(message = "חובה להזין משכורת")
    @Min(value = 1000,message = "שכר מינימלי הוא 1000")
    private Integer salary;
    @NotBlank(message = "חובה להזין מספר טלפון")
    @Pattern(regexp = "^05\\d{8}$", message = "מספר טלפון נייד לא תקין")
    private String phone;
}
