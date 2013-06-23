ALTER TABLE gapensi.kta_proses_status
 ADD Tgl_Proses DATE AFTER Tahun;
ALTER TABLE gapensi.kta_proses_status
 ADD Tgl_Persetujuan DATE AFTER Tgl_Proses;
ALTER TABLE gapensi.kta_proses_status
 ADD Tipe_Daftar CHAR(1) AFTER Tgl_Persetujuan;
