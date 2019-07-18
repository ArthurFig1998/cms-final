var express = require('express');
var Document = require('../models/document');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');


function getDocuments(req, res) {
  Document.find().then(documents => {
      res.status(200).json({
        message: "Documents fetched successfully!",
        documents: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
}

router.get("/", (req, res, next) => {
  getDocuments(req, res);
});


function saveDocument(res, document) {
  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
}

router.post('/', (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId('documents');

  const document = new Document({
    id: maxDocumentId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  saveDocument(res, document);
});



router.put('/:id', function (req, res, next) {
  Document.findOne({
    id: req.params.id
  }, function (err, document) {
    if (err || !document) {
      return res.status(500).json({
        title: 'No Document Found!',
        error: {
          document: 'Document not found!'
        }
      });
    }

    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    saveDocument(res, document);
  })
});

router.delete("/:id", (req, res, next) => {
  Document.findOne({
      id: req.params.id
    })
    .then(document => {
      Document.deleteOne({
          id: req.params.id
        })
        .then(result => {
          res.status(204).json({
            message: "Document deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

module.exports = router;
