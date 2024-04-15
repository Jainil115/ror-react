# app/controllers/pdf_controller.rb
class PdfController < ApplicationController
  def generate_pdf
    PdfGenerator.generate_pdf
    send_file 'project.pdf', filename: 'project.pdf', type: 'application/pdf', disposition: 'attachment'
  end
end
